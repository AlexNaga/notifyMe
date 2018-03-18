const GitHub = require('octocat');

const User = require('../models/user');
const Webhook = require('../models/webhook');

exports.getGithubOrganizations = (req, res, next) => {
  const token = req.body.headers.Authorization.split(' ')[1];

  User.findOne({ username: req.body.username })
    .then(user => {
      if (user && user.jwtToken === token) {
        const client = new GitHub({
          token: user.githubToken
        });

        const githubUser = client.me();

        // List organizations of the authenticated user
        githubUser.orgs()
          .then((orgs) => {
            res.status(200).json(orgs.list.map(organization => {
              return {
                url: organization.url,
                name: organization.login,
                reposUrl: organization.repos_url,
                hooksUrl: organization.hooks_url,
                image: organization.avatar_url
              }
            }));
          })
      } else {
        res.status(401).json({
          message: 'The token is invalid.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.saveGithubOrganizations = (req, res, next) => {
  let formData = req.body.data;
  let eventsToSave = {};

  // Get the selected organizations
  for (const organization in formData) {
    if (formData.hasOwnProperty(organization)) {
      const events = formData[organization];

      // Check if organization actually is selected
      if (events[0] === 'on') {
        // Remove first element status to clean up array
        events.shift();

        // Check if any event actually is selected
        if (events.length >= 1) {
          eventsToSave[organization] = events;
        }
      }
    }
  }

  const updateParams = {
    username: req.body.username,
    events: eventsToSave
  };

  Webhook.findOneAndUpdate({ username: req.body.username }, { $set: updateParams }, { new: true })
    .exec()
    .then(webhook => {
      if (!webhook) {
        const webhook = new Webhook({
          username: req.body.username,
          events: eventsToSave
        });

        webhook
          .save()
          .then(result => {
            // Save and then also create webhook
            exports.createGithubHook(req.body.username);

            res.status(201).json({
              message: 'Webhook created.'
            })
          })
          .catch(err => {
            res.status(500).json({
              error: err
            })
          });
      } else {
        webhook
          .save()
          .then(result => {
            // Update and then also create webhook
            exports.createGithubHook(req.body.username);

            res.status(201).json({
              message: 'Webhook updated.'
            })
          })
          .catch(err => {
            res.status(500).json({
              error: err
            })
          });
      }
    });
};


exports.createGithubHook = (username) => {
  let githubToken = '';

  User.findOne({ username: username })
    .then(user => {
      githubToken = user.githubToken;
    })

  Webhook.findOne({ username: username })
    .then(data => {
      for (const organization in data.events) {
        const eventsExist = data.events.hasOwnProperty(organization);
        console.log(eventsExist);

        if (eventsExist) {
          const events = data.events[organization];
          const client = new GitHub({
            token: githubToken
          });

          // Check if webhook already exist
          client.get('/orgs/' + organization + '/hooks')
            .then(response => {
              const hooks = response.body;

              hooks.map(hook => {
                const localHookUrl = process.env.WEBHOOK_URL;
                const fetchedHookUrl = hook.config.url;

                // Get the correct hook to edit
                if (localHookUrl === fetchedHookUrl) {
                  // Update webhook with new events
                  client.patch(hook.url, { events })
                    .then((response) => {
                      console.log(response.body);
                    });
                }
              })
            })
            .catch(err => {
              console.log(err);
              console.log('Error caught');
            });
        } else {
          // Just update webhook with no events OR just delete the webhook
        }
      }
    })
    .catch(err => {
      console.log('Could not create webhook');
      console.log(err);
    })
};
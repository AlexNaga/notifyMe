const GitHub = require('octocat');

const User = require('../models/user');
const Settings = require('../models/settings');

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
        eventsToSave[organization] = events;
      }
    }
  }

  const updateParams = {
    username: req.body.username,
    events: eventsToSave
  };

  Settings.findOneAndUpdate({ username: req.body.username }, { $set: updateParams }, { new: true })
    .exec()
    .then(settings => {
      if (!settings) {
        const settings = new Settings({
          username: req.body.username,
          events: eventsToSave
        });

        settings
          .save()
          .then(result => {
            // Save and then also create webhook
            exports.createGithubHook(req.body.username);

            res.status(201).json({
              message: 'Settings saved.'
            })
          })
          .catch(err => {
            res.status(500).json({
              error: err
            })
          });
      } else {
        settings
          .save()
          .then(result => {
            // Update and then also create webhook
            exports.createGithubHook(req.body.username);

            res.status(201).json({
              message: 'Settings updated.'
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

  // Get GitHub access token from the db
  User.findOne({ username: username })
    .then(user => {
      githubToken = user.githubToken;
    })

  // Get saved webhook data from the db
  Settings.findOne({ username: username })
    .then(data => {
      for (const organization in data.events) {
        const orgSelected = data.events.hasOwnProperty(organization);

        const client = new GitHub({
          token: githubToken
        });

        if (orgSelected) {
          let events = data.events[organization];
          const eventCount = events.length;

          // Check if any event actually is selected
          if (eventCount < 2) {

            // Check if webhook already exist
            client.get('/orgs/' + organization + '/hooks')
              .then(response => {
                const hooks = response.body;
                const hookExist = hooks.length >= 1;

                if (hookExist) {
                  hooks.map(hook => {
                    const localHookUrl = process.env.SERVER_DOMAIN;
                    const fetchedHookUrl = hook.config.url;

                    // Get the correct hook to delete
                    if (localHookUrl === fetchedHookUrl) {
                      client.del(hook.url)
                        .then((response) => {
                          console.log('Settings deleted');
                        })
                        .catch(err => {
                          console.log(err.body);
                        });
                    }
                  });
                }
              });

            return;
          } else {
            // Remove first item in array ['on']
            events.shift();

            // Check if webhook already exist
            client.get('/orgs/' + organization + '/hooks')
              .then(response => {
                const hooks = response.body;
                const hookExist = hooks.length >= 1;

                if (hookExist) {
                  hooks.map(hook => {
                    const localHookUrl = process.env.SERVER_DOMAIN + '/webhook';
                    const fetchedHookUrl = hook.config.url;

                    // Get the correct hook to edit
                    if (localHookUrl === fetchedHookUrl) {

                      // Update webhook with new events
                      client.patch(hook.url, { events })
                        .then((response) => {
                          console.log('Settings updated with event(s): ', events.join(', '));
                        })
                        .catch(err => {
                          console.log(err.body);
                        });
                    }
                  })
                } else {
                  let hookData = {
                    'name': 'web',
                    'active': true,
                    'events': events,
                    'config': {
                      'url': process.env.SERVER_DOMAIN + '/webhook',
                      'secret': process.env.GITHUB_WEBHOOK_SECRET,
                      'content_type': 'json'
                    }
                  };

                  // Create a new webhook
                  client.post('orgs/' + organization + '/hooks', hookData)
                    .then((response) => {
                      console.log('Settings created with event(s): ', events.join(', '));
                    })
                    .catch(err => {
                      console.log(err);
                    });
                }
              })
              .catch(err => {
                exports.createGithubHook(username);
              });
          }
        }
      }
    })
    .catch(err => {
      console.log('Could not create webhook');
    })
};
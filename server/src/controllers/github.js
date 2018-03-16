const github = require('octonode');
const request = require('axios');

const User = require('../models/user');
const Webhook = require('../models/webhook');

exports.getGithubOrganizations = (req, res, next) => {
  const token = req.body.headers.Authorization.split(' ')[1];

  User.findOne({ username: req.body.username })
    .then(user => {
      if (user && user.jwtToken === token) {
        let client = github.client(user.githubToken);
        let githubUser = client.me();

        // Get users organizations from GitHub
        githubUser.orgs((err, data, headers) => {
          res.status(200).json(data.map(organization => {
            return {
              url: organization.url,
              name: organization.login,
              reposUrl: organization.repos_url,
              hooksUrl: organization.hooks_url,
              image: organization.avatar_url
            }
          }));
        });
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
  const url = 'https://api.github.com/orgs/1dv612-test3/hooks/24085652';
  const params = {
    events: ['repository']
  };

  request.patch(url, params, {
    headers: {
      'Authorization': 'token 388692fd3a54fc793059e9c2cd034ca812d67ec9'
    }
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });


  //   let formData = req.body.data;
  //   let eventsToSave = {};

  //   // Get the selected organizations
  //   for (const organization in formData) {
  //     if (formData.hasOwnProperty(organization)) {
  //       const events = formData[organization];

  //       // Check if organization actually is selected
  //       if (events[0] === 'on') {
  //         // Remove first element status to clean up array
  //         events.shift();

  //         // Check if any event actually is selected
  //         if (events.length >= 1) {
  //           eventsToSave[organization] = events;
  //         }
  //       }
  //     }
  //   }

  //   const updateParams = {
  //     username: req.body.username,
  //     events: eventsToSave
  //   };

  //   Webhook.findOneAndUpdate({ username: req.body.username }, { $set: updateParams }, { new: true })
  //     .exec()
  //     .then(webhook => {
  //       if (!webhook) {
  //         const webhook = new Webhook({
  //           username: req.body.username,
  //           events: eventsToSave
  //         });

  //         webhook
  //           .save()
  //           .then(result => {
  //             // Save and then also create webhook
  //             exports.createGithubHook(req.body.username);

  //             res.status(201).json({
  //               message: 'Webhook created.'
  //             })
  //           })
  //           .catch(err => {
  //             res.status(500).json({
  //               error: err
  //             })
  //           });
  //       } else {
  //         webhook
  //           .save()
  //           .then(result => {
  //             // Update and then also create webhook
  //             exports.createGithubHook(req.body.username);

  //             res.status(201).json({
  //               message: 'Webhook updated.'
  //             })
  //           })
  //           .catch(err => {
  //             res.status(500).json({
  //               error: err
  //             })
  //           });
  //       }
  //     });
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
        const organizationExist = data.events.hasOwnProperty(organization);

        if (organizationExist) {
          const events = data.events[organization];

          let hookData = {
            'name': 'web',
            'active': true,
            'events': events,
            'config': {
              'url': 'http://stripe.notifyme.ultrahook.com',
              'secret': process.env.GITHUB_WEBHOOK_SECRET,
              'content_type': 'json'
            }
          };

          console.log(hookData);


          console.log('Send POST');
          request.post('https://api.github.com/orgs/1dv612-test3/hooks', {
            Authorization: 'token ' + githubToken,
            hookData
          })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });

        }
      }
    })
    .catch(err => {
      console.log('Error: Could not find webhook.');
    })
};
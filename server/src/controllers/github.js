const github = require('octonode');

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
  let formData = req.body.data;
  let result = [];

  // Get the selected organizations
  for (const key in formData) {
    if (formData.hasOwnProperty(key)) {
      const element = formData[key];

      if (element[0] === 'on') {
        console.log(key);
      }
    }
  }

  const updateParams = {
    username: req.body.username,
    url: 'http://localhost:1dv612',
    organizationName: '1dv612Update',
    events: req.body.data
  };

  Webhook.findOneAndUpdate({ username: req.body.username }, { $set: updateParams }, { new: true })
    .exec()
    .then(webhook => {
      if (!webhook) {
        const webhook = new Webhook({
          username: req.body.username,
          url: 'http://localhost:1dv612',
          organizationName: '1dv612New',
          events: req.body.data
        });

        webhook
          .save()
          .then(result => {
            console.log('Webhook created');

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
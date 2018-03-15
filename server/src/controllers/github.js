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
  console.log(req.body.username);
  console.log(req.body.data);


  const updateParams = {
    url: '1dv612',
    username: req.body.username
  };

  Webhook.findOneAndUpdate({ username: req.body.username }, { $set: updateParams }, { new: true })
    .exec()
    .then(webhook => {
      if (!webhook) {
        const webhook = new Webhook({
          url: '1dv023',
          username: req.body.username
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
            console.log('Webhook updated');

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

  // Object.entries(formData).forEach((webhook, index) => {
  //   console.log(webhook);
  // });

  // Object.keys(formData).forEach((webhook, index) => {
  //   console.log(webhook);
  // });
};
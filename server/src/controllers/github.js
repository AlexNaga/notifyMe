const github = require('octonode');

const User = require('../models/user');

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
  console.log('Save user settings to db');
  console.log(req.body.data);

};
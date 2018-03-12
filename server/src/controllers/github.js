const github = require('octonode');
const store = require('store');

exports.getGithubOrganizations = (req, res, next) => {
  let localStorage = store.get('user');
  let client = github.client(localStorage.accessToken);
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
    })
    );
  });
};

exports.getGithubRepos = (req, res, next) => {
  let client = github.client(req.session.accessToken);
  let githubUser = client.me();
  var ghorg = client.org('1dv612-test3');

  // Get users repositories from GitHub
  ghorg.repos((err, data, headers) => {
    res.status(200).json({
      githubRepos: data.map(org => {
        return {
          url: org.url
        }
      })
    });
  });
};
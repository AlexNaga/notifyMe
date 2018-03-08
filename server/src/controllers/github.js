const github = require('octonode');
const request = require('superagent');

exports.githubGetOrgs = (req, res, next) => {
  let username = req.session.username;
  let client = github.client(req.session.accessToken);
  let githubUser = client.me();

  // Get users organizations from GitHub
  githubUser.orgs((err, data, headers) => {
    res.status(200).json({
      githubOrgs: data.map(org => {
        return {
          url: org.url,
        }
      })
    });

    // data.forEach(org => {
    //   console.log(org.url);
    // });
  });

  // res.redirect('/auth/github');
};

exports.githubGetRepos = (req, res, next) => {
  let username = req.session.username;
  let client = github.client(req.session.accessToken);
  let githubUser = client.me();

  // Get users repositories from GitHub
  githubUser.repos((err, data, headers) => {
    res.status(200).json({
      githubRepos: data.map(org => {
        return {
          url: org.url,
        }
      })
    });

    // data.forEach(org => {
    //   console.log(org.url);
    // });
  });

  // res.redirect('/auth/github');
};
const github = require('octonode');
const request = require('superagent');

exports.githubGetOrgs = (req, res, next) => {
  let username = req.session.username;
  let client = github.client(req.session.accessToken);

  let githubUser = client.me();

  // Get users organizations
  githubUser.orgs((err, data, headers) => {
    data.forEach(org => {
      // console.log(org.url);
    });
  });

  // Get users repositories
  githubUser.repos((err, data, headers) => {
    data.forEach(repo => {
      console.log(repo.url);
    });
  });

  // request
  //   .get('https://api.github.com/users/' + username + '/orgs')
  //   .set('Authorization', 'token ' + req.session.accessToken)
  //   .then(result => {
  //     console.log('GitHub cb status code:', result.status);
  //   })
  //   .catch(err => {
  //     console.log('GitHub cb status code:', err.status);
  //   });

  res.status(200).json({
    message: 'Orgs'
  });
  // res.redirect('/auth/github');
};

exports.githubGetRepos = (req, res, next) => {
  request
    .get('https://api.github.com/user/repos')
    .set('Authorization', 'token ' + req.session.accessToken)
    .then(result => {
      console.log('GitHub cb status code:', result.status);
    })
    .catch(err => {
      console.log('GitHub cb status code:', err.status);
    });
  res.redirect('/');
};
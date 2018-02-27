const passport = require('passport');
const request = require('superagent');
const session = require('express-session');

// Authenticate a user with GitHub
exports.githubAuth = passport.authenticate('github', { scope: ['user', 'repo', 'admin: org', 'admin: org_hook'] });

// Recives a callback from GitHub
exports.githubCallback = (req, res, next) => {
  // request
  //   .get('https://api.github.com/user')
  //   .set('Authorization', 'token ' + req.user.accessToken)
  //   .then(result => {
  //     console.log('GitHub cb status code:', result.status);
  //   })
  //   .catch(err => {
  //     console.log('GitHub cb status code:', err.status);
  //   });

  req.session.accessToken = req.user.accessToken;

  res.redirect('/');
};
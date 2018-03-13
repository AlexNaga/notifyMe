const passport = require('passport');
const session = require('express-session');
const queryString = require('query-string');

// Authenticate a user with GitHub
exports.githubAuth = passport.authenticate('github', { scope: ['user', 'repo', 'admin: org', 'admin: org_hook'] });

// Recives a callback from GitHub
exports.githubCallback = (req, res, next) => {
  req.session.username = req.user.profile.username;

  const stringified = queryString.stringify({ 'access_token': req.user.accessToken });
  res.redirect('http://localhost:3000/?' + stringified);
};
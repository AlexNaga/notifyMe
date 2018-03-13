const passport = require('passport');
const session = require('express-session');
const store = require('store');

// Authenticate a user with GitHub
exports.githubAuth = passport.authenticate('github', { scope: ['user', 'repo', 'admin: org', 'admin: org_hook'] });

// Recives a callback from GitHub
exports.githubCallback = (req, res, next) => {
  store.set('user', {
    username: req.user.profile.username,
    accessToken: req.user.accessToken
  });

  store.set('testUser2', { name: 'thisIsSentFromServer' });

  res.redirect('http://localhost:3000');
};
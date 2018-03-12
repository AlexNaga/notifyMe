const passport = require('passport');
const session = require('express-session');

// Authenticate a user with GitHub
exports.githubAuth = passport.authenticate('github', { scope: ['user', 'repo', 'admin: org', 'admin: org_hook'] });

// Recives a callback from GitHub
exports.githubCallback = (req, res, next) => {
  req.session.accessToken = req.user.accessToken;
  req.session.username = req.user.profile.username;
  console.log('Access token: ', req.session.accessToken);
  
  res.redirect('http://localhost:3000');
};
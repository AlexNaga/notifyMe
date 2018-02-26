const passport = require('passport');

// Authenticate a user with GitHub
exports.githubAuth = passport.authenticate('github', { scope: ['user', 'repo', 'admin: org', 'admin: org_hook'] });

// Recives a callback from GitHub
exports.githubCallback = (req, res, next) => {
  console.log('GitHub username:', req.user.profile.username);
  console.log('GitHub access token:', req.user.accessToken);
  res.redirect('/');
};
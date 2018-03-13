const passport = require('passport');
const request = require('axios');

// Authenticate a user with GitHub
exports.githubAuth = passport.authenticate('github', { scope: ['user', 'repo', 'admin: org', 'admin: org_hook'] });

// Recives a callback from GitHub
exports.githubCallback = (req, res, next) => {
  request.post(process.env.DOMAIN + 'users', {
    username: req.user.profile.username,
    githubId: req.user.profile.id,
    githubToken: req.user.accessToken,
    jwtToken: '123456'
  })
    .then(response => {
    })
    .catch((error) => {
      res.status(500).json({
        error: err
      });
    });

  res.redirect('http://localhost:3000');
};
const passport = require('passport');
const request = require('axios');

// Authenticate a user with GitHub
exports.githubAuth = passport.authenticate('github', { scope: ['user', 'repo', 'admin: org', 'admin: org_hook'] });

// Recives a callback from GitHub
exports.githubCallback = (req, res, next) => {

  // Get token
  request.post(process.env.DOMAIN + 'users/login', {
    username: req.user.profile.username
  })
    .then((response) => {

      // Save user to db
      return request.post(process.env.DOMAIN + 'users', {
        username: req.user.profile.username,
        githubId: req.user.profile.id,
        githubToken: req.user.accessToken,
        jwtToken: response.data.token
      });
    })
    .then((response) => {
      // console.log('Response', response);
    })
    .catch((err) => {
      console.log(err);
    });

  res.redirect('http://localhost:3000');
};
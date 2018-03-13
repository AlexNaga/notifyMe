const passport = require('passport');
const queryString = require('query-string');
const request = require('axios');

// Authenticate a user with GitHub
exports.githubAuth = passport.authenticate('github', { scope: ['user', 'repo', 'admin: org', 'admin: org_hook'] });

// Recives a callback from GitHub
exports.githubCallback = (req, res, next) => {
  request.post(process.env.DOMAIN + 'users/create', {
    username: req.user.profile.username,
    githubId: req.user.profile.id,
    githubToken: req.user.accessToken,
    jwtToken: '123456'
  })
    .then((response) => {
      // console.log(response);
      console.log('It worked!');
      
    })
    .catch((error) => {
      console.log(error);
      console.log('An error!');
      
    });

  const stringified = queryString.stringify({ 'access_token': req.user.accessToken });
  res.redirect('http://localhost:3000/?' + stringified);
};
const passport = require('passport');
const request = require('axios');

// Authenticate a user with GitHub
exports.githubAuth = passport.authenticate('github', { scope: ['user', 'admin:org', 'admin:org_hook'] });

// Recives a callback from GitHub
exports.githubCallback = (req, res, next) => {
  const io = req.app.get('socketio');

  // Save user to db
  request.post(process.env.DOMAIN + 'users', {
    username: req.user.profile.username,
    githubId: req.user.profile.id,
    githubToken: req.user.accessToken
  })
    .then((response) => {
      io.on('connection', (client) => {
        client.emit('token', response.data.token);
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      })
    });

  res.redirect('http://localhost:3000');
};
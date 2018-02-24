const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

// Authenticate a user with GitHub
exports.githubAuth = (req, res, next) => {
  passport.authenticate('github', { scope: ['user:email'] });
};

// Recives a callback from GitHub
exports.githubCallback = (req, res, next) => {
  passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
      console.log('Successful authentication');
      
      // Successful authentication, redirect home.
      res.redirect('/');
    }
};
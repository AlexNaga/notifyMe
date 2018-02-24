const passport = require('passport');

// Authenticate a user with GitHub
exports.githubAuth = passport.authenticate('github', { scope: ['user', 'repo', 'admin: org', 'admin: org_hook'] });

// Recives a callback from GitHub
exports.githubCallback = passport.authenticate('github', { failureRedirect: '/login' });
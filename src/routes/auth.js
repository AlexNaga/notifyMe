const express = require('express');
const router = express.Router();
const passport = require('passport');

const AuthController = require('../controllers/auth');

// Authenticate a user with GitHub
router.get('/github', AuthController.githubAuth);

// Callback for GitHub access token
router.get('/github/callback', AuthController.githubCallback,
  (req, res) => {
    res.redirect('/success');
  });

module.exports = router;
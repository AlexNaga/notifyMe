const express = require('express');
const router = express.Router();

const GithubController = require('../controllers/github');

// Login user with Oauth2
router.get('/auth', GithubController.githubAuth);

router.get('/github_callback', GithubController.githubAuth);

module.exports = router;
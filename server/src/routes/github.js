const express = require('express');
const router = express.Router();

const githubController = require('../controllers/github');
const checkAuth = require('../auth/checkAuth');

router.get('/organizations', githubController.getGithubOrganizations);

router.get('/repos', githubController.getGithubRepos);

module.exports = router;
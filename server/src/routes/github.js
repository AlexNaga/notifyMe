const express = require('express');
const router = express.Router();

const githubController = require('../controllers/github');

router.get('/orgs', githubController.githubGetOrgs);

router.get('/repos', githubController.githubGetRepos);

module.exports = router;
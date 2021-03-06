const express = require('express');
const router = express.Router();

const GithubController = require('../controllers/github');
const checkAuth = require('../auth/checkAuth');

router.post('/organizations', GithubController.getGithubOrganizations);

module.exports = router;
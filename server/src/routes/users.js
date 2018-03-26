const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/checkAuth');

const UserController = require('../controllers/users');
const GithubController = require('../controllers/github');

// Save a user
router.post('/', UserController.saveUser);

// Authenticate a user
router.post('/login', UserController.saveUser);

// Delete a specific user
router.delete('/:username', checkAuth, UserController.deleteUser);

// Save user settings
router.post('/organizations', GithubController.saveGithubOrganizations);

module.exports = router;
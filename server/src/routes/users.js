const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/checkAuth');

const UsersController = require('../controllers/users');

// Saves a user
router.post('/', UsersController.saveUser);

// Authenticates a user
router.post('/login', UsersController.loginUser);

// Deletes a specific user
router.delete('/:username', checkAuth, UsersController.deleteUser);

module.exports = router;
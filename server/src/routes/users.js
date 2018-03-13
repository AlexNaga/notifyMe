const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/checkAuth');

const UsersController = require('../controllers/users');

// Saves a user
router.post('/', UsersController.saveUser);

// Authenticates a user
router.post('/login', UsersController.loginUser);

// Lists all users
router.get('/', checkAuth, UsersController.getUsers);

// Deletes a specific user
router.delete('/:username', UsersController.deleteUser);

module.exports = router;
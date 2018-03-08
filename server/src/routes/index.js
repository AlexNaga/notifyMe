const express = require('express');
const router = express.Router();

// const ensureAuth = require('../auth/ensureAuth');
const indexController = require('../controllers/index');

router.get('/', indexController.index);

router.get('/login', indexController.login);

router.get('/logout', indexController.logout);

module.exports = router;
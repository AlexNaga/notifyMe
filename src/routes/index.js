const express = require('express');
const router = express.Router();

// const requireLogin = require('../auth/requireLogin');
const indexController = require('../controllers/index');

router.get('/', indexController.index);

module.exports = router;
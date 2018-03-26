const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/checkAuth');

const EventController = require('../controllers/events');

// Save an event
router.post('/', EventController.saveEvent);

// Get the ten newest events
// router.get('/', EventController.getEvents);

module.exports = router;
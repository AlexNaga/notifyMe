const express = require('express');
const router = express.Router();

const WebhookController = require('../controllers/webhook');

// Receive a webhook
router.post('/', WebhookController.handleWebhook);

module.exports = router;
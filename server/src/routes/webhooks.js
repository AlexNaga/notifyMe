const express = require('express');
const router = express.Router();

const WebhooksController = require('../controllers/webhooks');

// Receive a webhook
router.post('/', WebhooksController.handleWebhook);

module.exports = router;
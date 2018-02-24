const express = require('express');
const router = express.Router();

const WebhooksController = require('../controllers/webhooks');

// Registers a webhook
router.post('/register', WebhooksController.registerWebhook);

// Lists all webhooks
router.get('/', WebhooksController.getWebhooks);

// Deletes a webhook
router.delete('/:webhookId', WebhooksController.deleteWebhook);

module.exports = router;
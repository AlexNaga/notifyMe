const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const webhookSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  organizationName: { type: String, required: true },
  events: {}
});

webhookSchema.plugin(timestamp);

module.exports = mongoose.model('Webhook', webhookSchema);
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const webhookSchema = mongoose.Schema({
  url: { type: String, required: true },
  username: { type: String, required: true, unique: true }
});

webhookSchema.plugin(timestamp);

module.exports = mongoose.model('Webhook', webhookSchema);
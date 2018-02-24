const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const webhookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  url: { type: String, required: true, unique: true }
});

webhookSchema.plugin(timestamp);

module.exports = mongoose.model('Webhook', webhookSchema);
const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');

const settingsSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  events: {}
});

settingsSchema.plugin(timestamp);

module.exports = mongoose.model('Settings', settingsSchema);
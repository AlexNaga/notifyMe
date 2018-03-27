const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');
const timeZone = require('mongoose-timezone');

const settingsSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  events: {}
});

settingsSchema.plugin(timestamp);
settingsSchema.plugin(timeZone);

module.exports = mongoose.model('Settings', settingsSchema);
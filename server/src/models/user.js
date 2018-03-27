const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');
const timeZone = require('mongoose-timezone');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  githubId: { type: String, required: true },
  githubToken: { type: String, required: true },
  jwtToken: { type: String, required: true },
  lastVisit: { type: String }
});

userSchema.plugin(timestamp);
userSchema.plugin(timeZone);

module.exports = mongoose.model('User', userSchema);

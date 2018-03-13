const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  githubId: { type: Number, required: true },
  githubToken: { type: String, required: true },
  jwtToken: { type: String, required: true }
});

userSchema.plugin(timestamp);

module.exports = mongoose.model('User', userSchema);

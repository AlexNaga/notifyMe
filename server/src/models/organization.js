const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const organizationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  url: { type: String, required: true, unique: true }
});

organizationSchema.plugin(timestamp);

module.exports = mongoose.model('Organization', organizationSchema);
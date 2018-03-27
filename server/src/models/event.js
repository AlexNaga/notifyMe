const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');

const eventSchema = mongoose.Schema({
  event: { type: String, required: true },
  action: { type: String, required: true },
  date: { type: String, required: true },
  organization: { type: String, required: true },
  repo_name: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, required: true },
  user: {
    username: { type: String, required: true },
    image: { type: String, required: true }
  }
});

eventSchema.plugin(timeStamp);

module.exports = mongoose.model('Event', eventSchema);
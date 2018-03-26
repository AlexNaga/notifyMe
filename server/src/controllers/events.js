const mongoose = require('mongoose');

const Event = require('../models/event');

// Save an event
exports.saveEvent = (req, res, next) => {
  const eventInfo = req.body.event;

  const event = new Event({
    event: eventInfo.event,
    action: eventInfo.action,
    date: eventInfo.date,
    organization: eventInfo.organization,
    repo_name: eventInfo.repo_name,
    url: eventInfo.url,
    icon: eventInfo.icon,
    user: {
      username: eventInfo.user.username,
      image: eventInfo.user.image
    }
  });

  event
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Event saved.'
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
};
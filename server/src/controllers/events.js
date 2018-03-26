const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Event = require('../models/event');

// Save an event
exports.saveEvent = (req, res, next) => {
  const event = new Event({
    signedInUser: req.body.signedInUser,
    event: req.body.event,
    action: req.body.action,
    date: req.body.date,
    repo_name: req.body.repo_name,
    url: req.body.url,
    icon: req.body.icon,
    user: {
      username: req.body.user.username,
      image: req.body.user.image
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
const moment = require('moment');
const mongoose = require('mongoose');

const Event = require('../models/event');
const User = require('../models/user');

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


exports.getEvents = (req, res, next) => {
  const token = req.body.headers.Authorization.split(' ')[1];

  User.findOne({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.jwtToken === token) {
        let userExist = user.lastVisit;

        if (userExist) {
          let lastVisit = moment(user.lastVisit, "dddd, MMMM Do YYYY, HH:mm:ss");

          // Only get events since last visit
          Event.find({ createdAt: { $gte: lastVisit } })
            .sort({ date: -1 })
            .exec()
            .then(result => {
              res.status(200).json(result.map(event => {
                return {
                  event: event
                }
              }));
            })
            .catch(err => {
              res.status(500).json({
                error: err
              });
            });
        } else {
          // Send back an empty array
          res.status(200).json([]);
        }
      } else {
        res.status(401).json({
          message: 'The token is invalid.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
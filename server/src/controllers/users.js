const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Saves a user
exports.saveUser = (req, res, next) => {
  const token = jwt.sign(
    {
      username: req.body.username,
      githubUserId: req.body.githubId
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );

  const updateParams = {
    username: req.body.username,
    githubId: req.body.githubId,
    githubToken: req.body.githubToken,
    jwtToken: token
  };

  User.findOneAndUpdate({ username: req.body.username }, { $set: updateParams }, { new: true })
    .exec()
    .then(user => {
      if (!user) {
        const token = jwt.sign(
          {
            username: req.body.username,
            githubUserId: req.body.githubId
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h"
          }
        );

        const user = new User({
          username: req.body.username,
          githubId: req.body.githubId,
          githubToken: req.body.githubToken,
          jwtToken: token
        });

        user
          .save()
          .then(result => {
            res.status(201).json({
              message: 'User created.',
              token: token
            })
          })
          .catch(err => {
            res.status(500).json({
              error: err
            })
          });
      } else {
        user
          .save()
          .then(result => {
            res.status(201).json({
              message: 'User updated.',
              token: token
            })
          })
          .catch(err => {
            res.status(500).json({
              error: err
            })
          });
      }
    });
};


// Deletes a specific user
exports.deleteUser = (req, res, next) => {
  User.remove({ username: req.params.username })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted.'
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
};

// Saves timestamp for last visit
exports.lastVisit = (req, res, next) => {
  const updateParams = { lastVisit: req.body.lastVisit };

  User.findOneAndUpdate({ username: req.body.username }, { $set: updateParams })
    .exec()
    .then(user => {
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
}
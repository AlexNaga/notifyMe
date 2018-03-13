const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Saves a user
exports.saveUser = (req, res, next) => {
  const updateParams = {
    username: req.body.username,
    githubId: req.body.githubId,
    githubToken: req.body.githubToken,
    jwtToken: req.body.jwtToken
  };

  User.findOneAndUpdate({ username: req.body.username }, { $set: updateParams }, { new: true })
    .exec()
    .then(user => {
      if (!user) {
        const user = new User({
          username: req.body.username,
          githubId: req.body.githubId,
          githubToken: req.body.githubToken,
          jwtToken: req.body.jwtToken
        });

        user
          .save()
          .then(result => {
            res.status(201).json({
              message: 'User created.'
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
              message: 'User updated.'
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

// Authenticates a user
exports.loginUser = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        const token = jwt.sign(
          {
            username: user.username,
            githubUserId: user.githubId
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h"
          }
        );

        return res.status(200).json({
          message: 'Authentication is successful.',
          token: token
        });
      } else {
        res.status(401).json({
          message: 'Authentication failed.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
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
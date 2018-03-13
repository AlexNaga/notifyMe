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
        return res.status(200).json({
          message: 'Authentication is successful.'
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

// Lists all users
exports.getUsers = (req, res, next) => {
  User.find()
    .select('_id user createdAt updatedAt')
    .exec()
    .then(users => {
      res.status(200).json({
        links: {
          index: {
            href: process.env.DOMAIN + 'api',
            method: 'GET',
            desc: 'Main entry point. Overview of routes.'
          },
          self: {
            href: process.env.DOMAIN + 'api/users',
            method: 'GET',
            desc: 'Route for listing all users.'
          },
          signup: {
            href: process.env.DOMAIN + 'api/users/signup',
            method: 'POST',
            desc: 'Route for creating a new user.'
          },
          login: {
            href: process.env.DOMAIN + 'api/users/login',
            method: 'POST',
            desc: 'Route for authenticating a user.'
          },
          delete: {
            href: process.env.DOMAIN + 'api/users/:userId',
            method: 'DELETE',
            desc: 'Route for deleting a user.'
          }
        },
        userCount: users.length,
        users: users.map(user => {
          return {
            _id: user._id,
            user: user.user,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            links: {
              "href": process.env.DOMAIN + 'api/users/' + user._id,
              method: 'GET',
              desc: 'More information about this user.'
            }
          }
        })
      });
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
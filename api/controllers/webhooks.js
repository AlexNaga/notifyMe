const mongoose = require('mongoose');

const Webhook = require('../models/webhook');

// Register a webhook
exports.registerWebhook = (req, res, next) => {
  // Regex for URL validation taken from: https://gist.github.com/dperini/729294
  const urlFilter = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  const regex = new RegExp(urlFilter);
  const url = req.body.url;

  if (!regex.test(url)) {
    return res.status(409).json({
      message: 'Not a valid URL.',
      url: url,
      links: {
        href: process.env.DOMAIN + 'api/webhooks/register',
        method: 'POST',
        desc: 'Create a new webhook with the following payload.',
        body: {
          href: 'String'
        }
      }
    });
  }

  Webhook.find({ "url": url })
    .then(webhook => {
      if (webhook.length >= 1) {
        return res.status(409).json({
          message: 'Webhook already exists.',
          url: url,
          id: webhook[0]._id,
          links: {
            href: process.env.DOMAIN + 'api/webhooks/',
            method: 'GET',
            desc: 'Route for listing all webhooks.'
          }
        });
      } else {
        const webhook = new Webhook({
          _id: new mongoose.Types.ObjectId(),
          url: url
        });

        webhook.save()
          .then(result => {
            res.status(201).json({
              message: 'Webhook successfully created.',
              createdWebhook: {
                _id: result._id,
                url: result.url,
                links: {
                  href: process.env.DOMAIN + 'api/webhooks/',
                  method: 'GET',
                  desc: 'Route for listing all webhooks.'
                }
              }
            });
          })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// Lists all webhooks
exports.getWebhooks = (req, res, next) => {
  Webhook.find()
    .select('_id url createdAt updatedAt')
    .exec()
    .then(webhooks => {
      res.status(200).json({
        links: {
          index: {
            href: process.env.DOMAIN + 'api',
            method: 'GET',
            desc: 'Main entry point. Overview of routes.'
          },
          self: {
            href: process.env.DOMAIN + 'api/webhooks',
            method: 'GET',
            desc: 'Route for listing all webhooks.'
          },
          register: {
            href: process.env.DOMAIN + 'api/webhooks/register',
            method: 'POST',
            desc: 'Route for registering a new webhook.'
          },
          delete: {
            href: process.env.DOMAIN + 'api/webhooks/:webhookId',
            method: 'DELETE',
            desc: 'Route for deleting a webhook.'
          }
        },
        webhookCount: webhooks.length,
        webhooks: webhooks.map(webhook => {
          return {
            _id: webhook._id,
            href: webhook.url,
            createdAt: webhook.createdAt,
            updatedAt: webhook.updatedAt
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

// Deletes a specific webhook
exports.deleteWebhook = (req, res, next) => {
  const id = req.params.webhookId;

  Webhook.findByIdAndRemove(id)
    .exec()
    .then(webhook => {
      if (!webhook) {
        return res.status(404).json({
          message: 'No webhook with the provided ID is found.',
          id: id
        });
      } else {
        res.status(200).json({
          message: 'Webhook successfully deleted.',
          id: id,
          links: {
            method: 'POST',
            href: process.env.DOMAIN + 'api/webhooks/register',
            desc: 'Create a new webhook with the following payload.',
            body: {
              href: 'String'
            }
          }
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
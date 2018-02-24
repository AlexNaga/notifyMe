const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const apiRoutes = require('./api/routes/index');
const webhookRoutes = require('./api/routes/webhooks');
const authRoutes = require('./api/routes/auth');

// mongoose.connect(
//   'mongodb://' + process.env.MONGO_ATLAS_USERNAME +
//   ':' + process.env.MONGO_ATLAS_PASSWORD +
//   '@rest-api-shard-00-00-wgaf2.mongodb.net:27017,rest-api-shard-00-01-wgaf2.mongodb.net:27017,rest-api-shard-00-02-wgaf2.mongodb.net:27017/notifyMe?ssl=true&replicaSet=rest-api-shard-0&authSource=admin'
//   // , () => { mongoose.connection.db.dropDatabase(); }
// );
// mongoose.Promise = global.Promise;

app.use(logger('dev')); // Logs all requests to the terminal
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/', apiRoutes);
app.use('/auth', authRoutes);
app.use('/api/webhooks', webhookRoutes);

// Error handling
app.use((req, res, next) => {
  const err = new Error('The resource could not be found.');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = app;
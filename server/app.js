require('dotenv').load();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const GitHubStrategy = require('passport-github2').Strategy;

const indexRoutes = require('./src/routes/index');
const authRoutes = require('./src/routes/auth');
const githubRoutes = require('./src/routes/github');
const userRoutes = require('./src/routes/users');
const webhookRoutes = require('./src/routes/webhooks');

mongoose.connect(
  'mongodb://' + process.env.MONGO_ATLAS_USERNAME +
  ':' + process.env.MONGO_ATLAS_PASSWORD +
  '@rest-api-shard-00-00-wgaf2.mongodb.net:27017,rest-api-shard-00-01-wgaf2.mongodb.net:27017,rest-api-shard-00-02-wgaf2.mongodb.net:27017/test?ssl=true&replicaSet=rest-api-shard-0&authSource=admin'
  // , () => { mongoose.connection.db.dropDatabase(); }
);
mongoose.Promise = global.Promise;

app.use(cors()); // CORS support
app.use(logger('dev')); // Logs all requests to the terminal
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(session({
//   resave: false,
//   saveUninitialized: false,
//   secret: process.env.SESSION_SECRET
// }));

// Passport config
app.use(passport.initialize());

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Code for MongoDB.
// Store the user ID then load it from the DB when deserializing.
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/auth/github/callback'
},
  (accessToken, refreshToken, profile, cb) => {
    return cb(null, { profile: profile, accessToken: accessToken });
  }
));

// Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/github', githubRoutes);
app.use('/users', userRoutes);
app.use('/webhook', webhookRoutes);

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
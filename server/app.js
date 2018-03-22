const dotenv = require('dotenv').load();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const request = require('axios');
const moment = require('moment');

const GitHubStrategy = require('passport-github2').Strategy;
const GithubWebHook = require('express-github-webhook');
const webhookHandler = GithubWebHook({ path: '/webhook/github', secret: process.env.GITHUB_WEBHOOK_SECRET });

const authRoutes = require('./src/routes/auth');
const githubRoutes = require('./src/routes/github');
const loginRoutes = require('./src/routes/login');
const userRoutes = require('./src/routes/users');
const webhookRoutes = require('./src/routes/webhook');


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
app.use(webhookHandler);


// Webhook handlers
webhookHandler.on('issues', function (repo, data) {
  let date = moment().format("dddd, MMMM Do YYYY, HH:mm:ss"); // Sunday, March 11th 2018, 18:14:21

  const eventInfo = {
    event: 'Issue',
    action: data.action,
    date: date,
    repo_name: data.repository.full_name,
    url: data.issue.html_url,
    icon: 'fas fa-exclamation',
    user: {
      username: data.sender.login,
      image: data.sender.avatar_url
    }
  };

  const io = app.get('socketio');
  io.emit('event', eventInfo);

  request.post(process.env.WEBHOOK_DISCORD_URL, {
    username: eventInfo.user.username,
    avatar_url: eventInfo.user.image,
    content: eventInfo.event +
      ' ' + eventInfo.action +
      ': [' + eventInfo.repo_name +
      '](' + eventInfo.url + ')'
  })
});

webhookHandler.on('release', function (repo, data) {
  let date = moment().format("dddd, MMMM Do YYYY, HH:mm:ss"); // Sunday, March 11th 2018, 18:14:21

  const eventInfo = {
    event: 'Release',
    action: data.action,
    date: date,
    repo_name: data.repository.full_name,
    url: data.release.html_url,
    icon: 'fas fa-tag',
    user: {
      username: data.sender.login,
      image: data.sender.avatar_url
    }
  };

  const io = app.get('socketio');
  io.emit('event', eventInfo);

  request.post(process.env.WEBHOOK_DISCORD_URL, {
    username: eventInfo.user.username,
    avatar_url: eventInfo.user.image,
    content: eventInfo.event +
      ' ' + eventInfo.action +
      ': [' + eventInfo.repo_name +
      '](' + eventInfo.url + ')'
  })
});

webhookHandler.on('repository', function (repo, data) {
  let date = moment().format("dddd, MMMM Do YYYY, HH:mm:ss"); // Sunday, March 11th 2018, 18:14:21

  const eventInfo = {
    event: 'Repository',
    action: data.action,
    date: date,
    repo_name: data.repository.full_name,
    url: data.repository.html_url,
    icon: 'fas fa-plus',
    user: {
      username: data.sender.login,
      image: data.sender.avatar_url
    }
  };

  const io = app.get('socketio');
  io.emit('event', eventInfo);

  request.post(process.env.WEBHOOK_DISCORD_URL, {
    username: eventInfo.user.username,
    avatar_url: eventInfo.user.image,
    content: eventInfo.event +
      ' ' + eventInfo.action +
      ': [' + eventInfo.repo_name +
      '](' + eventInfo.url + ')'
  })
});

webhookHandler.on('watch', function (repo, data) {
  let date = moment().format("dddd, MMMM Do YYYY, HH:mm:ss"); // Sunday, March 11th 2018, 18:14:21

  const eventInfo = {
    event: 'Repository',
    action: 'starred',
    date: date,
    repo_name: data.repository.full_name,
    url: data.repository.html_url,
    icon: 'fas fa-star',
    user: {
      username: data.sender.login,
      image: data.sender.avatar_url
    }
  };

  const io = app.get('socketio');
  io.emit('event', eventInfo);

  request.post(process.env.WEBHOOK_DISCORD_URL, {
    username: eventInfo.user.username,
    avatar_url: eventInfo.user.image,
    content: eventInfo.event +
      ' ' + eventInfo.action +
      ': [' + eventInfo.repo_name +
      '](' + eventInfo.url + ')'
  })
});


// Passport config
app.use(passport.initialize());

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

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
app.use('/auth', authRoutes);
app.use('/github', githubRoutes);
app.use('/login', loginRoutes);
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
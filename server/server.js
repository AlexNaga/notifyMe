const https = require('https');
const app = require('./app');
const fs = require('fs');

const sslPath = '/etc/letsencrypt/live/alexnaga.se/';

const options = {
  key: fs.readFileSync(sslPath + 'privkey.pem'),
  cert: fs.readFileSync(sslPath + 'fullchain.pem')
};

const port = process.env.PORT || 8000;
const server = https.createServer(options, app);
const io = require('socket.io').listen(server);

app.set('socketio', io);
server.listen(port);
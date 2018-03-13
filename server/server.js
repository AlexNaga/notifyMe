const http = require('http');
const app = require('./app');

const port = process.env.PORT || 8000;
const server = http.createServer(app);
const io = require('socket.io').listen(server);

app.set('socketio', io);
server.listen(port);
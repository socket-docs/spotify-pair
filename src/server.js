'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket(server, {
  cors: { origin: '*' },
});
const router = require('./Router');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', router);

io.on('connection', socket => {
  console.log('finally i am connceted !!!');
  let payload = 'ibrahim banat';
  io.emit('front', payload);
  socket.on('assign-me', payload => {
    socket.join(payload);

    io.to(payload).emit('hello-mf', { hi: 'hi', id: payload });
  });
  socket.on('play', roomId => {
    io.to(roomId).emit('play-handled', { name: 'novmber rain' });
  });
  socket.on('stop', roomId => {
    io.to(roomId).emit('stop-handled', { name: 'video is stopped' });
  });
  socket.on('pasue', roomId => {
    io.to(roomId).emit('pause-handled', { name: 'video is paused' });
  });
});

module.exports = port => {
  server.listen(port, () => {
    console.log('server is up . . . ');
    console.log(`server is running at http://localhost:${port}`);
  });
};

/**
 * handling spotify
 *
 */

/**
 *
 *
 * chat room functionality
 *
 */

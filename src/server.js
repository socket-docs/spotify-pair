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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', socket => {
  console.log('finally i am connceted !!!');
  let payload = 'ibrahim banat';
  io.emit('front', payload);

  socket.on('play', () => {
    io.emit('play-handled', { name: 'novmber rain' });
  });
  socket.on('stop', () => {
    io.emit('stop-handled', { name: 'video is stopped' });
  });
  socket.on('pasue', () => {
    io.emit('pause-handled', { name: 'video is paused' });
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

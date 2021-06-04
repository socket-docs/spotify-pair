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
const users = {};
const roomsIds = {};
const roomVideo = {};
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
    roomsIds[socket.id] =payload;

    io.to(payload).emit('hello', { hi: 'hi', id: payload });
  });

  socket.on('queue-check', payload =>{
    console.log('in-check');

    if(Object.keys(roomVideo).includes(payload.roomId) ){
      io.to(payload.roomId).emit('embed-id', roomVideo[payload.roomId]);

    }
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
  socket.on('video-id', payload => {
    io.to(payload.roomId).emit('embed-id', payload.videoId);
    roomVideo[payload.roomId]=  payload.videoId; 

  });
  socket.on('new-user', payload => {
    users[socket.id] = payload.name;
    socket.broadcast.to(payload.roomId).emit('user-connected', payload.name);
  });
  socket.on('send-chat-message', payload => {
    socket.broadcast.to(payload.roomId).emit('chat-message', {
      message: payload.message,
      name: users[socket.id],
    });
  });
  socket.on('disconnect', () => {
    // let socketSet = socket.id;
    console.log(roomsIds[socket.id] );
    const roomId = roomsIds[socket.id];
    socket.broadcast
      .to(roomId)
      .emit('user-disconnected', { name: users[socket.id] });
  });
  delete users[socket.id];
});

module.exports = port => {
  server.listen(port, () => {
    console.log('server is up . . . ');
    console.log(`server is running at http://localhost:${port}`);
  });
};
// io.sockets.on('connection', function(socket) {
//   var currentRoomId;
//   socket.on('join', function(roomId) {
//     socket.join(roomId);
//     currentRoomId = roomId;
//   });

//  socket.on('disconnect', function() {
//    socket.broadcast.in(currentRoomId).emit('user:left', socket.id);
//  });
// }

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

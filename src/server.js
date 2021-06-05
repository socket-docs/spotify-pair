'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const socket = require('socket.io');
const moment = require('moment');
const io = socket(server, {
  cors: { origin: '*' },
});

const router = require('./Router');
// const { delete } = require('./Router');
let messageArray = [];
const roomsMassages = {};
console.log(roomsMassages, 'check');
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
    roomsIds[socket.id] = payload;

    io.to(payload).emit('hello', { hi: 'hi', id: payload });
  });

  socket.on('queue-check', payload => {
    console.log('in-check');

    if (Object.keys(roomVideo).includes(payload.roomId)) {
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
    roomVideo[payload.roomId] = payload.videoId;
  });
  socket.on('new-user', payload => {
    socket.emit('old_massage', { message: roomsMassages[payload.roomId] });
    console.log('********************', roomsMassages[payload.roomId]);
    users[socket.id] = payload.name;
    socket.broadcast.to(payload.roomId).emit('user-connected', {
      name: payload.name,
      time: moment().format('h:mm a'),
    });
  });
  socket.adapter.on('create-room', () => {
    messageArray = [];
  });

  socket.on('send-chat-message', payload => {
    // if(!roomsMassages[payload.roomId]){
    //   roomsMassages[payload.roomId] =[]
    // }

    messageArray.push({
      message: payload.message,
      name: users[socket.id],
      time: moment().format('h:mm a'),
    });

    roomsMassages[payload.roomId] = messageArray;

    // console.log(payload.roomId,'room Id-------')
    // console.log(roomsMassages[payload.roomId]=[payload.roomId] );
    // console.log({ message: payload.message,name: users[socket.id],},'obbbssssssssssssssssss');

    // console.log('rooms messages: !', roomsMassages[payload.roomId]);
    // let newArray = [];
    // if (roomsMassages[payload.roomId]) {
    //   newArray = roomsMassages[payload.roomId];
    //   console.log('message array:', newArray);
    // }
    // // messageArray = roomsMassages[payload.roomId];
    // // console.log('message array:', newArray);
    // // newArray.push({
    // //   message: payload.message,
    // //   name: users[socket.id],
    // //   time: moment().format('h:mm a'),
    // // });
    // // newArray[newArray.length] = {
    // //   message: payload.message,
    // //   name: users[socket.id],
    // //   time: moment().format('h:mm a'),
    // // };
    // roomsMassages[payload.roomId] = newArray;
    // // newArray = [];
    // messageArray = [];

    // roomsMassages[payload.roomId].push( {message: payload.message, name: users[socket.id], time: moment().format('h:mm a'),});
    // roomsMassages[payload.roomId] = messageArray

    socket.broadcast.to(payload.roomId).emit('chat-message', {
      message: payload.message,
      name: users[socket.id],
      time: moment().format('h:mm a'),
    });
    // console.log(roomsMassages,'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww')
    // console.log('time ----- ' ,time)
  });

  socket.on('disconnect', () => {
    // let socketSet = socket.id;
    console.log(roomsIds[socket.id]);
    const roomId = roomsIds[socket.id];

    socket.broadcast.to(roomId).emit('user-disconnected', {
      name: users[socket.id],
      time: moment().format('h:mm a'),
    });

    console.log(
      io.sockets.adapter.rooms.get(roomId),
      '**********-**-*-**-*-*-**-*-'
    );
    if (!io.sockets.adapter.rooms.get(roomId)) {
      delete roomsMassages[roomId];
      console.log(
        roomsMassages,
        'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
      );
    }

    // console.log(io.sockets.adapter.rooms.get(roomId).size === 0 , roomId ,'ddddddddddddddddddddddddddddddddddddddddddddd')
    // delete roomsMassages[roomId];

    //  if ( io.in(roomId).sockets){
    //   io.in(roomId).sockets.sockets.forEach((socket,key)=>{
    //     console.log(socket,'kkkkk');
    //  })}

    delete users[socket.id];
  });
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

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
});

module.exports = port => {
  server.listen(port, () => {
    console.log('server is up . . . ');
    console.log(`server is running at http://localhost:${port}`);
  });
};

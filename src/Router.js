'use strict';

const express = require('express');
// const app = express();

const Room = require('./models/schema');
// const room = new Room();
const uuid = require('uuid').v4;

let router = express.Router();
const path = require('path');

router.get('/createId', async (req, res) => {
  let idx = uuid();
  console.log(idx);
  let room = new Room({ routeId: idx });
  const record = await room.save();
  res.redirect(`/${record.routeId}`);
});
router.get('/:id', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

module.exports = router;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = mongoose.Schema({
  routeId: { type: String },
});

const Rooms = mongoose.model('Rooms', RoomSchema);

module.exports = Rooms;

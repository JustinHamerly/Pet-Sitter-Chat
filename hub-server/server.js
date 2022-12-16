'use strict';

require('dotenv').config();
const PORT = process.env.PORT;

const { io } = require('socket.io-client');
const hub = require('socket.io')(PORT);

const messageQueue = {};

io.on('connection', socket => {
  console.log('Connected: ', socket.id);
})
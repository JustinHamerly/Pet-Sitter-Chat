'use strict';

require('dotenv').config();
const PORT = process.env.PORT;

const hub = require('socket.io')(PORT);

const messageQueue = {};

hub.on('connection', socket => {
  console.log('Connected: ', socket.id);

  
})
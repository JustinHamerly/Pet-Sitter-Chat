'use strict';

require('dotenv').config();
const PORT = process.env.PORT;
const io = require('socket.io')(PORT);

class HubServer {
  constructor(){
    this.messageQueue = {};
    this.hub = io;
  }

  start = () => {
    this.hub.on('connection', socket => {
      console.log('Connected: ', socket.id);
    
      socket.on('subscribe', payload => {
        this.createMessageQueue(payload)
        socket.join(payload.clientID)
      })
    })
  }
  
  createMessageQueue = (payload) => {
    let { event, clientID } = payload;
    if (!this.messageQueue[event]) this.messageQueue[event] = {};
    if (!this.messageQueue[event][clientID]) this.messageQueue[event][clientID] = {};
  }
}

const server = new HubServer();
server.start();
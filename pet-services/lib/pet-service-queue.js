'use strict';

require('dotenv').config();
const hubClient = require('socket.io-client');
const SERVER = process.env.SERVER;

class petServiceQueue {
  constructor(id){
    this.id = id;
    this.socket = hubClient.connect(SERVER);
  }

  trigger(eventType, payload){
    this.socket.emit(eventType, {clientID: this.id, payload})
  }

  subscribe(eventType, callback){
    this.socket.emit('subscribe', { clientID: this.id, event: eventType });
    this.socket.on(eventType, data => {
      let {messageID, payload} = data;
      this.socket.emit(
        'RECEIVED', 
        { messageID, event: eventType, clientID: this.id }
      );
      callback(payload)
    })
  }

}

module.exports = petServiceQueue;
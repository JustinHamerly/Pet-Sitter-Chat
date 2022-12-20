'use strict';

require('dotenv').config();
const PORT = process.env.PORT;
const io = require('socket.io')(PORT);
const uuid = require('uuid').v4;

class HubServer {
  constructor(){
    this.messageQueue = {};
    this.hub = io;
  }

  start = () => {

    this.hub.on('connection', socket => {
      //proof of life for connection
      console.log('Connected: ', socket.id);
    
      // when a subscription happens, a queue object will be made if it doesnt exist, and then the client will be put in a room via their id.
      socket.on('SUBSCRIBE', payload => {
        this.createMessageQueue(payload)
        socket.join(payload.clientID)
        console.log(this.messageQueue[payload.event]);
      })

      // when a message is received by a client, the message will be removed from the queue.
      socket.on('RECEIVED', payload => {
        console.log('----- MESSAGE RECEIVED REMOVED -----')
        let {messageID, event, clientID} = payload;
        delete this.messageQueue[event][clientID][messageID];
      })

      socket.on('NEW-PET-REQUEST', request => {
        console.log('----- NEW PET REQUEST -----');
        console.log(request)
        let messageID = uuid();
        this.messageQueue['NEW-PET-REQUEST']['sitter'][messageID] = request.payload;
        request.messageID = messageID;

        this.hub.in('sitter').emit('NEW-PET-REQUEST', request)
      })

      socket.on('REQUEST-ACCEPTED', request => {
        console.log('----- REQUEST ACCEPTED BY OWNER -----');

        let messageID = uuid();
        this.messageQueue['REQUEST-ACCEPTED']['owner'][messageID] = request.payload;
        request.messageID = messageID;

        this.hub.in('owner').emit('REQUEST-ACCEPTED', request)
      })

      socket.on('OWNER-MESSAGE', request => {
        console.log('----- OWNER SENT MESSAGE -----');

        let messageID = uuid();
        this.messageQueue['OWNER-MESSAGE']['sitter'][messageID] = request.payload;
        request.messageID = messageID;

        this.hub.in('sitter').emit('OWNER-MESSAGE', request)
      })

      socket.on('PAYMENT-REQUEST', request => {
        console.log('----- PAYMENT REQUEST -----')

        let messageID = uuid();
        this.messageQueue['PAYMENT-REQUEST']['owner'][messageID] = request.payload;
        request.messageID = messageID;

        this.hub.in('owner').emit('PAYMENT-REQUEST', request)
      })

      socket.on('SEND-PAYMENT', request => {
        console.log('----- OWNER SENT PAYMENT -----');

        let messageID = uuid();
        this.messageQueue['SEND-PAYMENT']['sitter'][messageID] = request.payload;
        request.messageID = messageID;

        this.hub.in('sitter').emit('SEND-PAYMENT', request)
      })

    })

  }
  
  createMessageQueue = ({ event, clientID }) => {  
    if (!this.messageQueue[event]) this.messageQueue[event] = {};
    if (!this.messageQueue[event][clientID]) this.messageQueue[event][clientID] = {};
  }
}

const server = new HubServer();
server.start();
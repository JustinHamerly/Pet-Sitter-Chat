'use strict';

const Queue = require('./lib/Queue');
const companyName = 'sitter'
const sitterQueue = new Queue(companyName);

sitterQueue.subscribe('NEW-PET-REQUEST', acceptRequest)
sitterQueue.subscribe('OWNER-MESSAGE', receiveMessage)
sitterQueue.subscribe('SEND-PAYMENT', receivePayment)

function acceptRequest(payload){
  console.log('Request Accepted for ' + payload.customer);
  payload.sitter = sitterQueue.id;
  setTimeout(
    () => sitterQueue.trigger('REQUEST-ACCEPTED', payload)
    ,1000
  )
}

function receiveMessage(payload){
  console.log(payload.customer + ' says ' + payload.message);
  console.log('Requesting payment from ' + payload.customer)
  setTimeout(
    () => sitterQueue.trigger('PAYMENT-REQUEST', payload)
    ,1000
  )
}

function receivePayment(payload){
  console.log('Received payment of ' + payload.payment + ' from ' + payload.customer);
}
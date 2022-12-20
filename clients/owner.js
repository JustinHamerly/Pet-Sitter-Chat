'use strict'

const Chance = require('chance');
const chance = new Chance();

const Queue = require('./lib/Queue');
const ownerQueue = new Queue('owner');

ownerQueue.subscribe('REQUEST-ACCEPTED', sendConfirmation)
ownerQueue.subscribe('PAYMENT-REQUEST', sendPayment);

const createPetRequest = () => {
  const mockRequest = {
    customer: chance.name(),
    reqId: chance.guid()
  }
  ownerQueue.trigger('NEW-PET-REQUEST', mockRequest);
}

setInterval(createPetRequest, 10000);

function sendConfirmation(payload){
  console.log(payload.sitter + ' accepted request.  Sending thank you.');
  payload.message = 'Thank You!';
  setTimeout(
    () => ownerQueue.trigger('OWNER-MESSAGE', payload) 
    ,1000
  )
}

function sendPayment(payload){
  console.log('Sending payment to ' + payload.sitter);
  payload.payment = '$' + Math.ceil(Math.random() * 20) + 50;
  setTimeout(
    () => ownerQueue.trigger('SEND-PAYMENT', payload)
    ,1000
  )
}
'use strict';

const Queue = require('./lib/Queue');
const companyName = 'sitter'
const sitterQueue = new Queue(companyName);

sitterQueue.subscribe('NEW-PET-REQUEST', acceptRequest)

function acceptRequest(payload){
  console.log(payload)
  console.log('Request Accepted')
  // sitterQueue.trigger('REQUEST-ACCEPTED', payload)
}

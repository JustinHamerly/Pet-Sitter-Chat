'use strict';

const Chance = require('chance');
const chance = new Chance();

const Queue = require('./lib/Queue');
const companyName = 'sitter'
const sitterQueue = new Queue(companyName);

sitterQueue.subscribe('NEW-PET-REQUEST', request => {
  console.log('----- REQUEST RECEIVED -----');
  console.log(request);
  console.log('     ');
  // sitterQueue.trigger('REQUEST-ACCEPTED', request)
})

sitterQueue.subscribe('OWNER-MESSAGE', payload => {})
sitterQueue.subscribe('SERVICE-PAID', payload => {})

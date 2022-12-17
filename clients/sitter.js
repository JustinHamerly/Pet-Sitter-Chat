'use strict';

const Chance = require('chance');
const chance = new Chance();

const Queue = require('./lib/Queue');
const companyName = chance.company();
const sitterQueue = new Queue(companyName);

sitterQueue.subscribe('NEW-PET-REQUEST', payload => {})
sitterQueue.subscribe('OWNER-MESSAGE', payload => {})
sitterQueue.subscribe('SERVICE-PAID', payload => {})

'use strict';

const Chance = require('chance');
const chance = new Chance();

const petServiceQueue = require('./lib/pet-service-queue');
const companyName = chance.company();
const sitterQueue = new petServiceQueue(companyName);

sitterQueue.subscribe('NEW-PET-REQUEST', payload => {})
sitterQueue.subscribe('OWNER-MESSAGE', payload => {})
sitterQueue.subscribe('SERVICE-PAID', payload => {})

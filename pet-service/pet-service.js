'use strict';

const Chance = require('chance');
const chance = new Chance();

const petServiceQueue = require('./lib/pet-service-queue');
const companyName = chance.company();
const queue = new petServiceQueue(companyName);


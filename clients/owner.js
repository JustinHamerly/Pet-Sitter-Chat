'use strict'

const Chance = require('chance');
const chance = new Chance();

const Queue = require('./lib/Queue');
const ownerQueue = new Queue('owners');

const createPetRequest = () => {
  const mockRequest = {
    customer: chance.name(),
    reqId: chance.guid()
  }
  ownerQueue.trigger('NEW-PET-REQUEST', mockRequest);
}

setInterval(createPetRequest, 5000);
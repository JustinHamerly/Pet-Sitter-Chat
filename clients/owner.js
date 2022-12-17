'use strict'

const Chance = require('chance');
const chance = new Chance();

const Queue = require('./lib/Queue');
const ownerName = chance.name();
const ownerQueue = new Queue(ownerName);

const createPetRequest = () => {
  const mockRequest = {
    customer: ownerName,
    location: `${chance.city()}, ${chance.state()}`,
    reqId: chance.guid()
  }
  ownerQueue.trigger('NEW-PET-REQUEST', mockRequest);
}

setInterval(createPetRequest, 2500);
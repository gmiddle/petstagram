'use strict';
const faker = require('faker');


const follows = [
  {
    followerId: 1,
    followedId: 2,
    createdAt: faker.date.past(1),
    updatedAt: new Date()
  },
  {
    followerId: 1,
    followedId: 3,
    createdAt: faker.date.past(1),
    updatedAt: new Date()
  },
  {
    followerId: 1,
    followedId: 4,
    createdAt: faker.date.past(1),
    updatedAt: new Date()
  },
  {
    followerId: 1,
    followedId: 5,
    createdAt: faker.date.past(1),
    updatedAt: new Date()
  },
  {
    followerId: 2,
    followedId: 1,
    createdAt: faker.date.past(1),
    updatedAt: new Date()
  },
  {
    followerId: 2,
    followedId: 3,
    createdAt: faker.date.past(1),
    updatedAt: new Date()
  },
  {
    followerId: 3,
    followedId: 1,
    createdAt: faker.date.past(1),
    updatedAt: new Date()
  },

  {
    followerId: 3,
    followedId: 2,
    createdAt: faker.date.past(1),
    updatedAt: new Date()
  },


];

// for (let i = 1; i <= 24; i++) {
//   let newFollow = {
//     followerId: faker.finance.amount(1, 30, 0),
//     followedId: i,
//     createdAt: faker.date.past(1),
//     updatedAt: new Date()
//   };
//   follows.push(newFollow);
// };

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Follows', follows, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Follows', null, {});
  }
};
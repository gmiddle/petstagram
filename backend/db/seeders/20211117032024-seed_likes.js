'use strict';
const faker = require('faker');

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const likes = [];

for (let i = 1; i <= 24; i++) {
  let newLike = {
    postId: faker.finance.amount(1, 30, 0),
    userId: i,
    createdAt: faker.date.past(1),
    updatedAt: new Date()
  };
  likes.push(newLike);
};

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Likes', likes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Likes', null, {});
  }
};

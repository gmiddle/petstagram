'use strict';
const faker = require('faker');

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomPosts() {
  const postOptions = [
    "Founders Brewing",
    "Structures Brewing",
    "Heineken",
    "Anheuser Busch",
    "Coors",
    "Cerveceria Modelo",
    "Miller",
    "Tree House Brewing",
    "Fremont Brewing",
    "Trillium Brewing",
    "Lawson's Finest Liquids",
    "Peticolas Brewing",
    "Firestone Walker",
    "Bells Brewing",
    "Old Nation Brewing",
  ];
  let postNum = getRandomNum(0, postOptions.length);
  return postOptions[postNum];
}

const posts = [];

for (let i = 0; i <= 30; i++) {
  let newPost = {
    description: `${randomPosts()}`,
    imgUrl: "",
    userId: faker.finance.amount(1, 24, 0),
    createdAt: faker.date.past(1),
    updatedAt: new Date()
  };
  posts.push(newPost);
};

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Posts', posts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};

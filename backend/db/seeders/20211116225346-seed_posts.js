'use strict';
const faker = require('faker');

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomPosts() {
  const postOptions = [
    "Wahoo!  That looks so fun!",
    "When did this happen?",
    "Awesome, nice work!",
    "Where did you go to see this?",
    "I remember the first time I saw this too.  Much wow.",
    "Space is so crazzzzzzy!.",
    "I saw this same thing just the other day",
    "Is this where we are going this weekend?",
    "I wish I could go to space.",
    "Anyone have a seat on a rocket that can get me here?",
    "Does space x fly here?",
    "This looks so cool!!!",
    "Wow, the great beyond is amazing",
    "Space is so freaking amazing!",
    "I could stare at these all day.",
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

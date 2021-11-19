'use strict';
const faker = require('faker');

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomComments() {
  const commentOptions = [
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
  let commentNum = getRandomNum(0, commentOptions.length);
  return commentOptions[commentNum];
}

const comments = [];

for (let i = 0; i <= 30; i++) {
  let newComment = {
    content: `${randomComments()}`,
    postId: faker.finance.amount(1, 20, 0),
    userId: faker.finance.amount(1, 24, 0),
    createdAt: faker.date.past(1),
    updatedAt: new Date()
  };
  comments.push(newComment);
};

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Comments', comments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};

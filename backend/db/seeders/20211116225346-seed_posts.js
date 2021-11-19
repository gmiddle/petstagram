'use strict';
const faker = require('faker');

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomPosts() {
  const postOptions = [
    "This is my favorite shot of space.",
    "Every time I see this, it gives me chills",
    "This is the first time I have seen this and I am super amazed",
    "Where did you go to see this?",
    "I remember the first time I saw this too.  Much wow.",
    "Space is so crazzzzzzy!",
    "This is the fifth time I have seen this, and it never gets old",
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


const picOptions = [
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362189/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.47.43_PM_qxho48.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362188/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.44.44_PM_splf7j.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362188/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.46.50_PM_uhmjlf.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362188/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.47.29_PM_r46scr.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362184/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.47.04_PM_rf1rll.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362182/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.43.49_PM_zecan2.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362182/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.47.17_PM_jiu2t2.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362180/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.47.58_PM_rgmb9x.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362178/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.45.32_PM_xdlsco.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362178/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.46.02_PM_vgx81g.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362177/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.41.38_PM_odovtf.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362178/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.48.13_PM_a9d5q3.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362177/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.46.18_PM_fghqjr.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362177/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.45.48_PM_hr2gvh.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362176/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.44.24_PM_h9szs4.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362175/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.46.36_PM_jg6y3g.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362174/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.45.20_PM_kzzoss.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362174/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.43.21_PM_wkpbja.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362173/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.44.09_PM_vxxlkg.png",
  "https://res.cloudinary.com/dxo7djnid/image/upload/v1637362189/spacestagram/seeder_pics/Screen_Shot_2021-11-19_at_2.45.01_PM_lqvjcz.png"
]


const posts = [];

for (let i = 0; i <= 19; i++) {
  let newPost = {
    description: `${randomPosts()}`,
    imgUrl: `${picOptions[i]}`,
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

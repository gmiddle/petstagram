// 'use strict';
// const faker = require("faker");
// const bcrypt = require("bcryptjs");

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert('Users', [
//       {
//         email: 'demo@user.io',
//         username: 'Demo-lition',
//         hashedPassword: bcrypt.hashSync('password'),
//         profilePic: "",
//         bio: ""
//       },
//       {
//         email: faker.internet.email(),
//         username: 'FakeUser1',
//         hashedPassword: bcrypt.hashSync(faker.internet.password()),
//         profilePic: "",
//         bio: ""
//       },
//       {
//         email: faker.internet.email(),
//         username: 'FakeUser2',
//         hashedPassword: bcrypt.hashSync(faker.internet.password()),
//         profilePic: "",
//         bio: ""
//       },
//     ], {});
//   },

//   down: async (queryInterface, Sequelize) => {
//     const Op = Sequelize.Op;
//     return queryInterface.bulkDelete('Users', {
//       username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
//     }, {});
//   }
// };


// --------------------
'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

const fakeUsers = [
  {
    email: 'demo@user.io',
    username: 'Demo-lition',
    hashedPassword: bcrypt.hashSync('password'),
    profilePic: "",
    bio: ""
  },
  {
    email: faker.internet.email(),
    username: 'FakeUser1',
    hashedPassword: bcrypt.hashSync(faker.internet.password()),
    profilePic: "",
    bio: ""
  },
  {
    email: faker.internet.email(),
    username: 'FakeUser2',
    hashedPassword: bcrypt.hashSync(faker.internet.password()),
    profilePic: "",
    bio: ""
  }
]

for (let i = 0; i <= 20; i++) {
  let newUser = {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    hashedPassword: bcrypt.hashSync(faker.internet.password()),
  }
  fakeUsers.push(newUser)
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', fakeUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
      return queryInterface.bulkDelete('Users', {
        username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
      }, {});
  }
};




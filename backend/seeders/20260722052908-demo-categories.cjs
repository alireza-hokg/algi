'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("categories", [
      {
        name: "تیشرت",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "شلوار",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("categories", null, {})
  }
};

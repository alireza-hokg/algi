'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "زنانه",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "شلوار",
        parent_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {})
  }
};

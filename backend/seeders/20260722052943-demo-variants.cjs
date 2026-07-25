'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("variants", [
      {
        product_id: 1,
        size: 44,
        quantity: 22,
        height: 10,
        width: 20,
        waist: 22,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("variants", null, {})
  }
};

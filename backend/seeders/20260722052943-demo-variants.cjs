'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("variants", [
      {
        product_id: 1,
        size: 44,
        color: ""
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("variants", null, {})
  }
};

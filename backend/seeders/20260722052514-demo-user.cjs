'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users LIMIT 2',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    if (users) {
      console.log('users exist.')
      return
    }
    await queryInterface.bulkInsert("users", [
      {
        phoneNumber: "09051461938",
        password: "Alirezza2547",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {})
    console.log('users deleted succussfully. ✅')
  }
};

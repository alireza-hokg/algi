'use strict';
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPass = await bcrypt.hash("Alirezza2547", 10)
    await queryInterface.bulkInsert("users", [
      {
        phoneNumber: "09051461938",
        password: hashedPass,
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

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("colors", [
      {
        id: 1,
        name: "مشکی",
        hex: "000000",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 2,
        name: "قرمز",
        hex: "ff0000",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 3,
        name: "سبز",
        hex: "00ff00",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
    await queryInterface.bulkDelete("colors", null, {})
    console.log("colors deleted succussfully.")
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1")
  }
};

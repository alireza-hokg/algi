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
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0")

    await queryInterface.bulkDelete("categories", null, {})
    console.log("categories deleted successfully. ✅")
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1")
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const products = await queryInterface.sequelize.query(
      'SELECT id FROM products',
      { type: queryInterface.sequelize.QueryTypes.SELECT}
    )
    if (!products) {
      console.log("You need products first.")
      return;
    }
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
    await queryInterface.bulkInsert("variants", [
      {
        product_id: 1,
        size: 44,
        quantity: 22,
        height: 10,
        width: 20,
        waist: 22,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 1,
        size: 46,
        quantity: 22,
        height: 10,
        width: 20,
        waist: 22,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 2,
        size: 44,
        quantity: 22,
        height: 10,
        width: 20,
        waist: 22,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 2,
        size: 46,
        quantity: 22,
        height: 10,
        width: 20,
        waist: 22,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 3,
        size: 44,
        quantity: 22,
        height: 10,
        width: 20,
        waist: 22,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 3,
        size: 46,
        quantity: 22,
        height: 10,
        width: 20,
        waist: 22,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1")
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
    await queryInterface.bulkDelete("variants", null, {})
    console.log("variants deleted succussfully.")
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1")
  }
};

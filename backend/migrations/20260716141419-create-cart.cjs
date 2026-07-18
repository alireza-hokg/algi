'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
      },
      user_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          validate: {
              isInt: true,
              min: 1
          }
      },
      status: {
          type: Sequelize.ENUM("active", "abandoned", "purchased"),
          defaultValue: "active",
          validate: {
              isIn: [["active", "purchased"]]
          }
      },
      totalPrice: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      discountAmount: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true
      },
      finalPrice: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      } 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
    await queryInterface.dropTable('Carts');
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1")
  }
};
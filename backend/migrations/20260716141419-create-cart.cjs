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
      product_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          validate: {
              isInt: true,
              min: 1
          }
      },
      
      status: {
          type: Sequelize.ENUM("active", "purchased"),
          defaultValue: "active",
          validate: {
              isIn: [["active", "purchased"]]
          }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carts');
  }
};
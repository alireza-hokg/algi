'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cart-Items', {
      id: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
      },
      cart_id: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false
      },
      product_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false
      },
      quantity: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 1,
          validate: {
              isInt: true,
              min: 1
          }
      },
      unitPrice: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
              isDecimal: true,
              min: 0
          }
      },
      totalprice: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      discountAmount: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: true
      },
      finalPrice: {
          type: Sequelize.INTEGER,
          allowNull: false
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
    await queryInterface.dropTable('Cart-Items');
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      name: {
          type: Sequelize.STRING(70),
          allowNull: false,
          validate: {
              isShort(value) {
                  if (value.length < 3) {
                      throw new Error("value can't have less than 3 characters.")
                  }
              },
              isLong(value) {
                  if (value.length > 70) {
                      throw new Error("value can't have more than 70 characters")
                  }
              }
          }
      },
      price: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      category_id: {
          type: Sequelize.INTEGER,
      },
      sku: {
          type: Sequelize.STRING,
          allowNull: false
      },
      slug: {
          type: Sequelize.STRING,
          unique: true,
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
    await queryInterface.dropTable('Products');
  }
};
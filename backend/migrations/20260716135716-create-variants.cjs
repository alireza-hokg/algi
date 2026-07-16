'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Variants', {
      id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      size: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      color: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      height: {
          type: Sequelize.DECIMAL(10,2),
          allowNull: true
      },
      width: {
          type: Sequelize.DECIMAL(10,2),
          allowNull: true
      },
      waist: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: true
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
    await queryInterface.dropTable('Variants');
  }
};
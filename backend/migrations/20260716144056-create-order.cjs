'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
      },
      user_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false
      },
      orderNumber: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          unique: true
      },
      total_amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      discount_amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
      },
      status: {
          type: Sequelize.ENUM(
              'pending',      // Order placed, waiting for payment
              'processing',   // Payment received, preparing shipment
              'shipped',      // Order Shipped
              'delivered',    // Order deilivered to customer
              'cancelled',
              'refunded'
          ),
          defaultValue: 'pending',
          allowNull: false
      },
      paymentStatus: {
          type: Sequelize.ENUM(
              'pending',
              'paid',
              'failed',
              'refunded',
          ),
          allowNull: false,
          defaultValue: 'pending'
      },
      shippingAddress: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      phone: {
          type: Sequelize.STRING(20),
          allowNull: false
      },
      note: {
          type: Sequelize.TEXT,
          allowNull: true
      },
      shippedAt: {
          type: Sequelize.DATE,
          allowNull: true
      },
      deliveredAt: {
          type: Sequelize.DATE,
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
    await queryInterface.dropTable('Orders');
  }
};
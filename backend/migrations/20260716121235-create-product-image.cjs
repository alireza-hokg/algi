'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      product_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "products",
          key: "id"
        }
      },
      image_url: {
        type: Sequelize.STRING(500),
        allowNull: false,
        unique: true
      },
      image_text: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      is_main: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: "ایا عکس اصلی است"
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: "سایز فایل به کیلوبایت"
      },
      mime_type: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductImages');
  }
};
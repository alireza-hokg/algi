'use strict';
const slugify = require("slugify")

module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM categories',
      { type: queryInterface.sequelize.QueryTypes.SELECT}
    )
    if (!categories) {
      console.log("No categories found.Please run categories first")
      return;
    }

    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
    await queryInterface.bulkInsert("products", [
      {
        name: "یاکوزی",
        price: 100000,
        category_id: 1,
        sku: "q023",
        slug: slugify("4یاکوزی", { lower: true }, `-q023`),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "اسکلت",
        price: 20000,
        category_id: 1,
        sku: "f339",
        slug: slugify("3یاکوزی", { lower: true }, `-q023`),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "مام فیت",
        price: 50020,
        category_id: 2,
        sku: "f339",
        slug: slugify("2یاکوزی", { lower: true }, `-q023`),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "مام استایل",
        price: 80020,
        category_id: 2,
        sku: "u811",
        slug: slugify("1یاکوزی", { lower: true }, `-q023`),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1")

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
    await queryInterface.bulkDelete("products", null, {});
    console.log("products deleted successfully. ✅")
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1")
  }
};

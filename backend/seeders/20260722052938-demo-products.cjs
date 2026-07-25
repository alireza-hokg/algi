'use strict';
const slugify = require("slugify")

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("products", [
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
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("products", null, {})
  }
};

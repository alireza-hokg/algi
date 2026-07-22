'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("products", [
      {
        name: "یاکوزی",
        price: 100000,
        category_id: 1,
        sku: "q023"
      },
      {
        name: "اسکلت",
        price: 20000,
        category_id: 1,
        sku: "f339"
      },
      {
        name: "مام فیت",
        price: 50020,
        category_id: 2,
        sku: "f339"
      },
      {
        name: "مام استایل",
        price: 80020,
        category_id: 2,
        sku: "u811"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("products", null, {})
  }
};

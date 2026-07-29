'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const products = await queryInterface.sequelize.query(
      'SELECT id FROM products LIMIT 5',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    if (products.length === 0) {
      console.log("No products found.Please run products seeders first.");
      return;
    }

    const productImages = [];
    const now = new Date();
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0")

    for (const product of products) {
      productImages.push({
        product_id: product.id,
        image_url: `https://picsum.photos/${product.id}/picsum/200/300`,
        image_text: `تصویر اصلی محصول ${product.id}`,
        is_main: true,
        size: Math.floor(Math.random()* 2000) + 500,
        mime_type: "image/jpeg",
        createdAt: now,
        updatedAt: now
      })

      for (let i = 0; i < 2; i++) {
        productImages.push({
          product_id: product.id,
          image_url: `https://picsum.photos/${product.id}_${i}/picsum/200/300`,
          image_text: `تصویر ${i} محصول ${product.id}`,
          is_main: false,
          size: Math.floor(Math.random()* 1500) + 300,
          mime_type: i===1 ? 'image/jpeg' : 'image/png',
          createdAt: now,
          updatedAt: now
        })
      }

      await queryInterface.bulkInsert("product_images", productImages, {})
      console.log(`${productImages.length} product images seeded succussfully. ✅`)
      await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1")
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
    await queryInterface.bulkDelete("product_images", null, {});
    console.log("All product images deleted!")
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1")
  }
};

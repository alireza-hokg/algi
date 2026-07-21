'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const indexOperations = [
        { table: "variants", fields: ["product_id"], name: "variants_product_id_idx" },
        { table: "product_images", fields: ["product_id"], name: "product_images_product_id_idx" },
        { table: "products", fields: ["category_id"], name: "products_category_id_idx" },
        { table: "cart_items", fields: ["cart_id"], name: "cart_items_cart_id_idx" },
        { table: "cart_items", fields: ["product_id"], name: "cart_items_product_id_idx" },
        { table: "carts", fields: ["user_id"], name: "carts_user_id_idx" },
        { table: "order_items", fields: ["order_id"], name: "order_items_order_id_idx" },
        { table: "order_items", fields: ["product_id"], name: "order_items_product_id_idx" },
        { table: "orders", fields: ["user_id"], name: "orders_user_id_idx" }
      ];

      await Promise.all(
        indexOperations.map(({ table, fields, name }) => {
          queryInterface.addIndex(table, fields, {
            name,
            transaction
          })
        })
      )
      await transaction.commit();
      console.log("تمام ایندکس ها با موفقیت ساخته شدن.")
    }
    catch(err) {
      await transaction.rollback();
      console.log("خطا در ساخت ایندکس ها تغییرات برگشت داده شد.", err.message)
      throw err
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { transaction })
    try {
      const indexNames = [
        "orders_user_id_idx",
        "order_items_product_id_idx",
        "order_items_order_id_idx",
        "carts_user_id_idx",
        "cart_items_product_id_idx",
        "cart_items_cart_id_idx",
        "products_category_id_idx",
        "product_images_product_id_idx",
        "variants_product_id_idx"
      ];

      const tableNames = {
        "orders_user_id_idx": "orders",
        "order_items_product_id_idx": "order_items",
        "order_items_order_id_idx": "order_items",
        "carts_user_id_idx": "carts",
        "cart_items_product_id_idx": "cart_items",
        "cart_items_cart_id_idx": "cart_items",
        "products_category_id_idx": "products",
        "product_images_product_id_idx": "product_images",
        "variants_product_id_idx": "variants"
      };

      await Promise.all(
        indexNames.map(indexName => 
          queryInterface.removeIndex(tableNames[indexName], indexName, {
            transaction
          }).catch(error => {
            if (error.message.includes('does not exist') || 
                error.message.includes('Unknown index')) {
              console.log(`ℹ️ ایندکس ${indexName} وجود نداشت، نادیده گرفته شد`);
              return; 
            }
            throw error;
          })
        )
      )
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { transaction })
      await transaction.commit();
      console.log('✅ تمام ایندکس‌ها با موفقیت حذف شدند');
    }
    catch(err) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { transaction })
      await transaction.rollback();
      console.error('❌ خطا در حذف ایندکس‌ها:', err);
      throw err;
    }
  }
};


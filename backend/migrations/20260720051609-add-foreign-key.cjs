'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    const foreignKeyOperations = [
        { 
          table: "variants", 
          fields: ["product_id"], 
          referenceTable: "products",
          name: "fk_variants_product_id" 
        },
        { 
          table: "product_images", 
          fields: ["product_id"], 
          referenceTable: "products", 
          name: "fk_product_images_product_id" 
        },
        { 
          table: "products", 
          fields: ["category_id"], 
          referenceTable: "categories", 
          name: "fk_products_category_id" 
        },
        { 
          table: "order_items", 
          fields: ["order_id"], 
          referenceTable: "orders", 
          name: "fk_order_items_order_id" 
        },
        { 
          table: "order_items", 
          fields: ["product_id"], 
          referenceTable: "products", 
          name: "fk_order_items_product_id" 
        },
        { 
          table: "orders", 
          fields: ["user_id"], 
          referenceTable: "users", 
          name: "fk_orders_user_id" 
        },
        { 
          table: "cart_items", 
          fields: ["cart_id"], 
          referenceTable: "carts", 
          name: "fk_cart_items_cart_id" ,
          onDelete: "RESTRICT"
        },
        { 
          table: "cart_items", 
          fields: ["product_id"], 
          referenceTable: "products", 
          name: "fk_cart_items_product_id",
          onDelete: "RESTRICT"
        },
        {
          table: "carts", 
          fields: ["user_id"], 
          referenceTable: "users", 
          name: "fk_carts_user_id",
          onDelete: "RESTRICT"
        }
      ];
    try {
      await Promise.all(
        foreignKeyOperations.map(({ table, fields, referenceTable, name, onDelete }) => 
          queryInterface.addConstraint(table, {
            fields,
            type: "foreign key",
            references: {
              table: referenceTable,
              field: "id",
            },
            onDelete: onDelete || "CASCADE",
            name,
            transaction
          })
        )
      )
      await transaction.commit();
      console.log("کلید های خارجی ساخته شد.")
    }
    catch(err) {
      await transaction.rollback();
      console.log("ساخت کلید های خارجی خطا میدهد", err.message)
      throw err
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const foreignKeyNames = [
        "fk_order_items_product_id",
        "fk_order_items_order_id",
        "fk_orders_user_id",
        "fk_carts_user_id",
        "fk_cart_items_product_id",
        "fk_cart_items_cart_id",
        "fk_products_category_id",
        "fk_product_images_product_id",
        "fk_variants_product_id"
      ];

      for (const name of foreignKeyNames) {
        const tableMap = {
          "fk_order_items_product_id": "order_items",
          "fk_order_items_order_id": "order_items",
          "fk_orders_user_id": "orders",
          "fk_carts_user_id": "carts",
          "fk_cart_items_product_id": "cart_items",
          "fk_cart_items_cart_id": "cart_items",
          "fk_products_category_id": "products",
          "fk_product_images_product_id": "product_images",
          "fk_variants_product_id": "variants"
        };

        await queryInterface.removeConstraint(
          tableMap[name],
          name,
          { transaction }
        );
      }

      await transaction.commit();
      console.log("✅ کلیدهای خارجی با موفقیت حذف شدند.");
      
    } catch (err) {
      await transaction.rollback();
      console.error("❌ خطا در حذف کلیدهای خارجی:", err.message);
      throw err;
    }
  }
};

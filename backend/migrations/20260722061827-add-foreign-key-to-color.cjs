'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      
      await queryInterface.addIndex("colors", ["variant_id"], {
        name: "colors_variant_id_idx",
        transaction
      })
      await queryInterface.addConstraint("colors",
        {
          fields: ["variant_id"],
          type: "foreign key",
          references: {
            table: "variants",
            field: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT",
          name: "fk_colors_variant_id",
          transaction
        }
      )
      await transaction.commit();
    }
    catch(err) {
      await transaction.rollback();
      console.log(err.message)
      throw err
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeIndex("colors", "colors_variant_id_idx", { transaction });
      await queryInterface.removeConstraint("colors", "fk_colors_variant_id", { transaction })
      await transaction.commit();
    }
    catch(err) {
      await transaction.rollback();
      console.log(err.message)
    }
  }
};

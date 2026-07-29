'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM categories',
      { type: queryInterface.sequelize.QueryTypes.SELECT}
    )
    if (categories) {
      console.log("categories exists.")
      return;
    }
    
    await queryInterface.bulkInsert("categories", [
      {
        name: "زنانه",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "شلوار",
        parent_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {})
    console.log("categories deleted successfully. ✅")
  }
};

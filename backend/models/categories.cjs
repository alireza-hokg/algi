const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {

  }

  Category.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    parent_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: "Category",
    tableName: "categories"
  })
  return Category
}
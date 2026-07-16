import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
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
        allowNull: false
    },
    parent_id: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: true
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: "Category"
  })
  return Category
}
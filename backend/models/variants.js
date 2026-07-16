import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Variants extends Model {
    
  }

  Variants.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    height: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    width: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    waist: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: "Variant"
  })
  return Variants
}
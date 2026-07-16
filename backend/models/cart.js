import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Cart extends Model {
    
  }

  Cart.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1
        }
    },
    product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1
        }
    },
    
    status: {
        type: DataTypes.ENUM("active", "purchased"),
        defaultValue: "active",
        validate: {
            isIn: [["active", "purchased"]]
        }
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: "Cart"
  })
  return Cart;
}
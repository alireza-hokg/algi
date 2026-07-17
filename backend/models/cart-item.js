import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class CartItem extends Model {

  }

  CartItem.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    cart_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
        validate: {
            isInt: true,
            min: 1
        }
    },
    unitPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0
        }
    },
    totalprice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    discountAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    finalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: "CartItem"
  })
  return CartItem
}
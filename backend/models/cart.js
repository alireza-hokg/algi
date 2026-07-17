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
    status: {
        type: DataTypes.ENUM("active", "abandoned", "purchased"),
        defaultValue: "active",
        validate: {
            isIn: [["active", "purchased", "abandoned"]]
        }
    },
    totalPrice: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    discountAmount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    finalPrice: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: "Cart"
  })
  return Cart;
}
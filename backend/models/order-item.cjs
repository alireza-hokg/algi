const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate = function(models) {
      this.belongsTo(models.Order, {
        foreignKey: {
          name: "order_id",
          allowNull: false
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      })

      this.belongsTo(models.Product, {
        foreignKey: {
          name: "product_id",
          allowNull: false
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      })
    }
  }
  
  OrderItem.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    finalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    attributes: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'اطلاعات اضافی مثل رنگ، سایز و ...'
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: "Order_Item",
    tableName: "order_items"
  })
  return OrderItem
}
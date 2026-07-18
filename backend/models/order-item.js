import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class OrderItem extends Model {
    
  }
  
  OrderItem.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
    modelName: "OrderItem"
  })
  return OrderItem
}
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Order extends Model {

  }

  Order.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    orderNumber: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true
    },
    total_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    discount_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM(
            'pending',      // Order placed, waiting for payment
            'processing',   // Payment received, preparing shipment
            'shipped',      // Order Shipped
            'delivered',    // Order deilivered to customer
            'cancelled',
            'refunded'
        ),
        defaultValue: 'pending',
        allowNull: false
    },
    paymentStatus: {
        type: DataTypes.ENUM(
            'pending',
            'paid',
            'failed',
            'refunded',
        ),
        allowNull: false,
        defaultValue: 'pending'
    },
    shippingAddress: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    shippedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    deliveredAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: "Order"
  })
  return Order
}
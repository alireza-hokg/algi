import sequelize from "../config/db.js";
import { DataTypes } from "@sequelize/core";
import OrderItem from "./order-items.js";

const Order = sequelize.define("Orders", {
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
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
}, {
    timestamps: true,
    tableName: "orders",
    hooks: {
        beforeUpdate: user => {
            user.updatedAt = new Date();
        }
    }
})

Order.hasMany(OrderItem, {
    foreignKey: {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false
    },
    sourceKey: "id"
})

export default Order;
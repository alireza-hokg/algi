import sequelize from "../utils/db";
import { DataTypes } from "@sequelize/core";
import User from "./users";

const Order = sequelize.define("Orders", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: true
    },
    order_data: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    total_amount: {
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
    payment_status: {
        type: DataTypes.ENUM(
            'pending',
            'paid',
            'failed',
            'refunded',
        ),
        defaultValue: 'pending',
        allowNull: false
    },

}, {
    timestamps: true
})

User.hasOne(Order, {
    foreignKey: {
        name: "fk_user_id_idx",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    sourceKey: "id"
});

export default Order;
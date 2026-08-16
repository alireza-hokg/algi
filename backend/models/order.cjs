const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate = function(models) {
            this.hasMany(models.Order_Item, {
                foreignKey: {
                    name: "order_id",
                    allowNull: false
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT"
            })

            this.belongsToMany(models.Product, {
                through: "Order_Item",
                foreignKey: "order_id",
                otherKey: "product_id"
            })

            this.belongsTo(models.User, {
                foreignKey: {
                    name: "user_id",
                    allowNull: false
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT"
            })
        }
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
    modelName: "Order",
    tableName: "orders",
    paranoid: true
    })
    return Order
}
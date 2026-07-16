import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    order_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
            notNull: { msg: "order_id الزامی است" }
        }
    },
    product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
            notNull: { msg: "product_id الزامی است"}
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 1000,
            isInt: "تعداد باید عدد صحیح باشد"
        }
    },
    price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
            min: 0,
            max: 999999999
        }
    }
}, {
    timestamps: true,
    tableName: "order_items",
    indexes: [
        { 
            fields: ['order_id']
        },
        {
            fields: ['product_id']
        },
    ]
});

export default OrderItem;
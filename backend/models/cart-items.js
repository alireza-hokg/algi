import { DataTypes } from "sequelize";

import Cart from "./carts.js";
import sequelize from "../config/db.js";
import Product from "./products.js";

const CartItems = sequelize.define("CartItems", {
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
        type: DataTypes.BIGINT.UNSIGNED,
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
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0
        }
    },
}, {
    timestamps: true,
    tableName: "cart_items",
    indexes: [
        {
            fields: ["product_id"]
        },
        {
            fields: ["cart_id"]
        },
        {
            unique: true,
            fields: ["cart_id", "product_id"]
        }
    ]
})

export default CartItems;

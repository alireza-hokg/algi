import { DataTypes } from "sequelize";

import sequelize from "../config/db.js";
import CartItems from "./cart-items.js";
import Product from "./products.js";

const Cart = sequelize.define(
    "Cart", {
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
        product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1
            }
        },
        
        status: {
            type: DataTypes.ENUM("active", "purchased"),
            defaultValue: "active",
            validate: {
                isIn: [["active", "purchased"]]
            }
        }
    }, {
        timestamps: true,
        tableName: "carts",
        freezeTableName: false,
        paranoid: false,
        indexes: [
            {
                fields: ["product_id"]
            },
            {
                fields: ["user_id", "status"]
            },
            {
                fields: ["user_id", "product_id", "status"],
            }
        ]
    }
)

// Cart.belongsToMany(Product, {
//     through: CartItems,
// })

// Cart.hasMany(CartItems, {
//     foreignKey: {
//         name: "cart_id",
//         onDelete: "CASCADE",
//         onUpdate: "CASCADE"
//     }
// })
// CartItems.belongsTo(Cart);


export default Cart
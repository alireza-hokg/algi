import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";

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
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        }
    }, {
        timestamps: true,
        indexes: [
            {
                fields: ["product_id"]
            },
            {
                fields: ["user_id"]
            }
        ]
    }
)

export default Cart;
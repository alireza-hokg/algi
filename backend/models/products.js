import sequelize from "../utils/db.js";
import { DataTypes } from "@sequelize/core";

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
            isShort(value) {
                if (value.length < 3) {
                    throw new Error("value can't have less than 3 characters.")
                }
            },
            isLong(value) {
                if (value.length > 70) {
                    throw new Error("value can't have more than 70 characters")
                }
            }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: true,
    tableName: "products"
})

export default Product;
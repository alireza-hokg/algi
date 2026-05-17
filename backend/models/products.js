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
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: "products",
    hooks: {
        beforeUpdate: product => {
            product.updatedAt = new Date();
        },
    }
})

export default Product;
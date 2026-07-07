import sequelize from "../config/db.js";
import { DataTypes } from "@sequelize/core";
import ProductImages from "./product-images.js";
import OrderItem from "./order-items.js";
import Cart from "./carts.js";

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
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
    },
}, {
    timestamps: true,
    tableName: "products",
    hooks: {
        beforeUpdate: product => {
            product.updatedAt = new Date();
        },
    }
})

Product.hasMany(ProductImages, {
    foreignKey: {
        name: "product_id",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    },
    sourceKey: "id",
})

Product.hasMany(OrderItem, {
    foreignKey: {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    sourceKey: "id"
})

Product.hasMany(Cart, {
    foreignKey: {
        name: "product_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    sourceKey: "id"
})

export default Product;
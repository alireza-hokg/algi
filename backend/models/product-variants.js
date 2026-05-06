import sequelize from "../utils/db.js";
import { DataTypes } from "@sequelize/core";
import Product from "./products.js";

const ProductVariant = sequelize.define("ProductVariants", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: "product_variants"
})

Product.hasMany(ProductVariant, {
    foreignKey: {
        name: "product_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false
    },
    sourceKey: "id",
})

export default ProductVariant;
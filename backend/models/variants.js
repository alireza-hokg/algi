import sequelize from "../utils/db.js";
import { DataTypes } from "@sequelize/core";
import Product from "./products.js";

const Variant = sequelize.define("Variant", {
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
    height: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    width: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    waist: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
}, {
    timestamps: true,
    tableName: "variants",
    hooks: {
        beforeUpdate: user => {
            user.updatedAt = new Date()
        }
    }
})

Product.hasMany(Variant, {
    foreignKey: {
        name: "product_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false
    },
    sourceKey: "id",
})

export default Variant;
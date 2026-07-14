import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Product from "./products.js";

const Category = sequelize.define(
    "Category",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parent_id: {
            type: DataTypes.SMALLINT,
            allowNull: true
        }
    }
);


// Category.hasMany(Product, {
//     foreignKey: {
//         name: "category_id",
//         onDelete: "SET NULL",
//         onUpdate: "CASCADE"
//     },
//     sourceKey: "id"
// })
// Product.belongTo(Category)

export default Category
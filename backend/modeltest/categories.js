import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

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

export default Category
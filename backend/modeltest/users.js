import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM(
            "admin",
            "customer"
        ),
        defaultValue: "customer",
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true,
})

export default User;
import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
})

export default User;
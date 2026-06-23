import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";
import Order from "./orders.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
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
    hooks: {
        beforeUpdate: (user) => {
            user.updatedAt = new Date();
        }
    }
})

User.hasMany(Order, {
    foreignKey: {
        name: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false
    },
    sourceKey: "id"
});

export default User;
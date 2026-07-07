import { DataTypes } from "@sequelize/core";
import sequelize from "../config/db.js";

const otpSchema = sequelize.define(
    "otp",
    {
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        attemps: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        timestamps: true,
        hooks: {
            beforeUpdate: user => {
                user.updatedAt = new Date()
            }
        }
    }
)

export default otpSchema;
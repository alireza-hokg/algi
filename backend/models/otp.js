import { DataTypes } from "@sequelize/core";
import sequelize from "../utils/db.js";

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
    }
)

export default otpSchema;
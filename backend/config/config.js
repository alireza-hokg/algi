import { Sequelize } from "@sequelize/core";

const config = {
    development: {
        host: DB_HOST,
        database: DB_NAME || "algi",
        user: DB_USER || "root",
        password: DB_PASS || "1234",
        dialect: DB_DIALECT,
        port: Number(DB_PORT) || 3306,
    },
    production: {
        host: DB_HOST,
        database: DB_NAME || "algi",
        user: DB_USER || "root",
        password: DB_PASS || "1234",
        dialect: DB_DIALECT,
        port: Number(DB_PORT) || 3306,
        pool: {
            min: 2,
            max: 10,
            acquire: 60000,
            idle: 30000
        }
    }
}
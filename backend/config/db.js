import Sequelize from "sequelize";

// اطلاعات دیتابیس
const { DB_HOST, DB_NAME, DB_PASS, DB_DIALECT, DB_USER, DB_PORT } = process.env;

// پیکربندی sequelize برای اتصال به mysql
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: DB_DIALECT || "mysql",
    port: Number(DB_PORT) || 3306,
    pool: {
        min: 2,
        max: 5,
        acquire: 30000,
        idle: 1000
    },
    logging: console.log
})

// اتصال اولیه به دیتابیس
try {
    await sequelize.authenticate();
    console.log("Database connection established successfully");
}
catch(err) {
    console.log("Unable to connect to the database:", err.message);
    process.exit(1);
}

export default sequelize;
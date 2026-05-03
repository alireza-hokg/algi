import Sequelize from "@sequelize/core";

const { DB_HOST, DB_NAME, DB_PASS, DB_DIALECT, DB_USER, DB_PORT } = process.env;

const sequelize = new Sequelize({
    host: DB_HOST,
    username: DB_USER,
    database: DB_NAME,
    password: DB_PASS,
    dialect: DB_DIALECT,
    port: DB_PORT || 3306
})

try {
    await sequelize.authenticate();
} catch(err) {
    console.log(err.message);
    process.exit();
}

export default sequelize;
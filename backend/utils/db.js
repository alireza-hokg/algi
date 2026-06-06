import Sequelize from "@sequelize/core";

/**
 * Get database configuration data from environment variable
 * 
 * @constant
 * @type {Object}
 * @property {string} DB_HOST - Database server host (e.g localhost or 127.0.0.1)
 * @property {string} DB_NAME - Name of the database to connect
 * @property {string} DB_PASS - Password for database authentication
 * @property {string} DB_DIALECT - SQL dialect (for example mysql, postgresql, ...)
 * @property {string} DB_USER - Username for database authentication
 * @property {string} DB_PORT - Port number
 */
const { DB_HOST, DB_NAME, DB_PASS, DB_DIALECT, DB_USER, DB_PORT } = process.env;

/**
 * Sequelize instance configured for connection
 * 
 * @description
 * Creates and configures a Sequelize connection instance of Sequelize 
 * using the environment variable
 * 
 * @instance
 * @type {Sequelize}
 * 
 * @property {string} host - Database server address from DB_HOST
 * @property {string} database - Database name from DB_NAME
 * @property {string} user - Username for authenticating to database from DB_NAME
 * @property {string} password - Password database from DB_PASS
 * @property {string} dialect - SQL dialect from DB_DIALECT,
 * @property {string} port - port number (default is 3306 if DB_PORT is invalid)
 * @property {Function} logging - console logger for SQL queries
 */
const sequelize = new Sequelize({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASS,
    dialect: DB_DIALECT,
    port: Number(DB_PORT) || 3306,
    logging: console.log
})

/**
 * Attempts to authenticate the database connection
 * 
 * @description
 * Tests the database connection by calling sequelize.authenticate
 * If authenticate true the process won't stop and continues.
 * If an error occurs, the error message is logged and the process exists.
 * 
 * @async
 * @throws {Error} When database connection fails - caught and handled internally
 */
try {
    await sequelize.authenticate();
} catch(err) {
    console.log(err.message);
    process.exit();
}

export default sequelize;
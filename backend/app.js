import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";

import sequelize from "./utils/db.js";
import productsRoutes from "./routes/products.js";
import VariantsRoutes from "./routes/variants.js";
import UserRoutes from "./routes/users.js";

import { createData } from "./seeders/seed.js";
import { responseFormatter } from "./middlewares/responseFormatter.js";

/** Default server port (can be overridden by environment variable) */
const { SERVER_PORT = 9000 } = process.env;

const app = express();

// ============= Middlewares =============
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
})); 

app.use(cookieParser())
app.use(express.json()); // Parse json request bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies (for form submissions)

app.use(responseFormatter); // Custom response formatter middleware

// ============ API Routes ============
app.use("/api/v1/", productsRoutes) // Product management routes
app.use("/api/v1/", VariantsRoutes) // Product variants routes
app.use("/api/v1", UserRoutes)      // User management routes

/**
 * Initializes and starts the Express server
 * @async
 * @returns {Promise<void>}
 * @throws {Error} if database connection or server startup fails
 */
async function startServer() {
    try {
        // Disable foreign key checks to avoid conflicts when dropping/recreating tables
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
        // Sync all models with database (force: true drops existing tables)
        await sequelize.sync({ force: true });
        console.log("Database connected successfully");
        createData();

        // Start HTTP server on configured port
        app.listen(SERVER_PORT, (req, res) => {
            console.log(`Server is listening to port ${SERVER_PORT}`)
        })
    } catch(err) {
        console.log("Unable to start server ", err.message);
    }
}

startServer();

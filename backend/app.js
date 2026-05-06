import express from "express";
import cors from "cors";
import "dotenv/config";

import sequelize from "./utils/db.js";
import productsRoutes from "./routes/products.js";
import ProductVariantsRoutes from "./routes/product-variants.js";

import User from "./models/users.js";
import ProductVariant from "./models/product-variants.js"

const { SERVER_PORT = 9000 } = process.env;
const app = express();

app.use(express.json());
app.use(cors())
app.use("/api/v1/", productsRoutes)
app.use("/api/v1/", ProductVariantsRoutes)


async function startServer() {
    try {
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
        // Start syncing database
        await sequelize.sync({ force: true });
        console.log("Database connected successfully");

        // Start listening to port 9000
        app.listen(SERVER_PORT, (req, res) => {
            console.log("Server is listening to port "+SERVER_PORT)
        })
    } catch(err) {
        console.log("Unable to start server ", err.message);
    }
}

startServer();

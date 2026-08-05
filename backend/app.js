import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";

import path from "path";
import { fileURLToPath } from "url";

import db from "./models/index.cjs";
import productsRoutes from "./routes/products.js";
import variantsRoutes from "./routes/variants.js";
import userRoutes from "./routes/users.js";
import productImagesRoute from "./routes/product-images.js";
import ordersRoute from "./routes/orders.js";
import orderItemsRoute from "./routes/order-items.js";
import cartsRoute from "./routes/carts.js";
import categoriesRoute from "./routes/categories.js";
import colorsRoute from "./routes/colors.js";

import { responseFormatter } from "./middlewares/responseFormatter.js";

const { SERVER_PORT = 9000 } = process.env;

const app = express();
const sequelize = db.sequelize;

// ============= CORS =============
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(responseFormatter);

// ============= تنظیم مسیر uploads =============
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const uploadsPath = path.join(__dirname, "uploads/");

// Static files
app.use("/uploads", express.static(uploadsPath));

// ============= ✅ راه حل: فقط cookieParser قبل از مسیر آپلود =============
app.use(cookieParser());

// ============= ✅ مسیر آپلود را قبل از express.json() قرار دهید =============
app.use("/api/v1", productImagesRoute);

// ============= ✅ middleware های JSON را بعد از مسیر آپلود قرار دهید =============
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============ بقیه API Routes ============
app.use("/api/v1", productsRoutes);
app.use("/api/v1", variantsRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", ordersRoute);
app.use("/api/v1", orderItemsRoute);
app.use("/api/v1", cartsRoute);
app.use("/api/v1", categoriesRoute);
app.use("/api/v1/", colorsRoute);

// ============ راه حل جایگزین (اگر نشد) ============
// می‌توانید express.json() را با تنظیمات خاص استفاده کنید:
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

async function startServer() {
    const isDevelopment = process.env.NODE_ENV === "development";
    
    try {
        await sequelize.authenticate();
        console.log("Database connection established successfully.");
        if (isDevelopment) {
            console.log("Development database synced (force: true)");
        }
        app.listen(SERVER_PORT, () => {
            console.log(`Server is listening to port ${SERVER_PORT}`);
        });
    } catch(err) {
        console.log("Unable to start server ", err.message);
        process.exit(1);
    }
}

startServer();
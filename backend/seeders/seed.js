import Product from "../models/products.js";
import ProductVariant from "../models/product-variants.js";
import { categoriesData, otpsData, productsData, usersData, variantsData } from "./seed-data.js";
import User from "../models/users.js";
import otpSchema from "../models/otp.js";
import Category from "../models/categories.js";

export async function createData() {
    await Product.bulkCreate(productsData);
    await ProductVariant.bulkCreate(variantsData);
    await User.bulkCreate(usersData);
    await otpSchema.bulkCreate(otpsData);
    await Category.bulkCreate(categoriesData);
}

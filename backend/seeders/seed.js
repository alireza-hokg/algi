import Product from "../models/products.js";
import ProductVariant from "../models/product-variants.js";
import { productsData, usersData, variantsData } from "./seed-data.js";
import User from "../models/users.js";

export async function createData() {
    await Product.bulkCreate(productsData);
    await ProductVariant.bulkCreate(variantsData);
    await User.bulkCreate(usersData);
}

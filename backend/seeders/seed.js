import Product from "../models/products.js";
import Variant from "../models/variants.js";
import { categoriesData, productsData, usersData, variantsData } from "./seed-data.js";
import User from "../models/users.js";
import Category from "../models/categories.js";

export async function createData() {
    await Product.bulkCreate(productsData);
    await Variant.bulkCreate(variantsData);
    await User.bulkCreate(usersData);
    await Category.bulkCreate(categoriesData);
}

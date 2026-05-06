import Product from "../models/products.js";
import ProductVariant from "../models/product-variants.js";
import { productsData, variantsData } from "./seed-data.js";

export async function createData() {
    await Product.bulkCreate(productsData);
    await ProductVariant.bulkCreate(variantsData);
}

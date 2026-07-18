import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

import User from "./user.js"
import Cart from "./cart.js";
import Category from "./categories.js";
import Product from "./product.js";
import ProductImage from "./product-image.js";
import Variant from "./variants.js";
import CartItem from "./cart-item.js";
import Order from "./order.js";
import OrderItem from "./order-item.js";

export const models = {
    User: User(sequelize, DataTypes),
    Category: Category(sequelize, DataTypes),
    Product: Product(sequelize, DataTypes),
    ProductImage: ProductImage(sequelize, DataTypes),
    Variant: Variant(sequelize, DataTypes),
    Cart: Cart(sequelize, DataTypes),
    CartItem: CartItem(sequelize, DataTypes),
    Order: Order(sequelize, DataTypes),
    OrderItem: OrderItem(sequelize, DataTypes),
    Cart: Cart(sequelize, DataTypes)
}
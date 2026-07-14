import User from "./users.js";
import Product from "./products.js"
import ProductImage from "./product-images.js"
import Cart from "./carts.js"
import CartItem from "./cart-items.js"
import Order from "./orders.js";
import OrderItem from "./order-items.js"
import Variant from "./variants.js";
import Category from "./categories.js";


User.hasMany(Order, {
    foreignKey: {
        name: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false
    },
    sourceKey: "id"
});
Order.belongsTo(User)

User.hasMany(Cart, {
    foreignKey: {
        name: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false
    },
    sourceKey: "id"
})
Cart.belongsTo(User)

Category.hasMany(Product, {
    foreignKey: {
        name: "category_id",
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    },
    sourceKey: "id"
})
Product.belongsTo(Category)

Product.hasMany(ProductImage, {
    foreignKey: {
        name: "product_id",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    },
    sourceKey: "id",
})
ProductImage.belongsTo(Product)

Product.hasMany(OrderItem, {
    foreignKey: {
        name: "product_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    sourceKey: "id"
})
OrderItem.belongsTo(Product)

Product.belongsToMany(Cart, {
    through: CartItem
})

Cart.belongsToMany(Product, {
    through: CartItem,
})

Cart.hasMany(CartItem, {
    foreignKey: {
        name: "cart_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
})
CartItem.belongsTo(Cart);

Order.hasMany(OrderItem, {
    foreignKey: {
        name: "order_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false
    },
    sourceKey: "id"
})
OrderItem.belongsTo(Order, {
    foreignKey: "order_id"
})

Product.hasMany(Variant, {
    foreignKey: {
        name: "product_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false
    },
    sourceKey: "id",
})
Variant.belongsTo(Product);

export { 
    User, 
    Category, 
    Product, 
    ProductImage, 
    Cart, 
    CartItem, 
    Order, 
    OrderItem, 
    Variant
}

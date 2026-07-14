import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ProductImage = sequelize.define("ProductImage", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            tableName: "products",
            key: "id"
        },
    },
    image_url: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true
    },
    image_text: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    is_main: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: "ایا عکس اصلی است"
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "سایز فایل به کیلوبایت"
    },
    mime_type: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    tableName: "product_images"
})

export default ProductImage;
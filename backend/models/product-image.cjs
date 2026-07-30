const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ProductImage extends Model {

    }

    ProductImage.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
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
        timestamps: true,
        sequelize,
        modelName: "Product_Image",
        tableName: "product_images"
    })

    ProductImage.associate = function(models) {
        this.belongsTo(models.Product, {
            foreignKey: {
                name: "product_id",
                allowNull: false,
            },
            targetKey: "id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        })
    }
    return ProductImage
}
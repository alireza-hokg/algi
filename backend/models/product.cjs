const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.hasMany(models.Variant, {
        foreignKey: {
          name: "product_id",
          allowNull: false,
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      
      this.hasMany(models.Product_Image, {
        foreignKey: {
          name: "product_id",
          allowNull: false,
          as: "Product_Images"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    }
  }

  Product.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(70),
      allowNull: false,
      unique: true,
      validate: {
        isShort(value) {
          if (value.length < 3) {
              throw new Error("value can't have less than 3 characters.")
          }
        },
        isLong(value) {
          if (value.length > 70) {
              throw new Error("value can't have more than 70 characters")
          }
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    discount_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: "Product",
    tableName: "products",
    paranoid: true
  })


  return Product
}
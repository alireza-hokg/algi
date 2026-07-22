import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Product extends Model {
    
  }

  Product.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
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
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    modelName: "Product"
  })

  Product.associations = function(models) {
    this.hasMany(models.Variant, {
      foreignKey: {
        name: "productId",
        allowNull: false
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
    
    this.hasMany(models.ProductImage, {
      foreignKey: {
        name: "productId",
        allowNull: false
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
  }

  return Product
}
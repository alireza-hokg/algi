import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Variants extends Model {
    
  }

  Variants.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "Product"
        }
    },
    size: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    height: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    width: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    waist: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: "Variant"
  })

  Variants.associations = function(models) {
    this.belongsTo(models.Product, {
        foreignKey: {
            name: "productId",
            allowNull: false
        }
    })

    this.hasMany(models.Color, {
        foreignKey: {
            name: "variant_id",
            allowNull: false
        },
        sourceKey: "id",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
    })
  }
  return Variants
}
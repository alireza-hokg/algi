const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Variants extends Model {
        static associate(models) {
            this.belongsTo(models.Product, {
                foreignKey: {
                    name: "product_id",
                    allowNull: false,
                },
                targetKey: "id",
                onDelete: "RESTRICT",
                onUpdate: "CASCADE"
            })

            this.hasMany(models.Variant_Color, {
                foreignKey: {
                    name: "variant_id",
                    allowNull: false
                },
                sourceKey: "id",
                onDelete: "RESTRICT",
                onUpdate: "CASCADE"
            })

            this.belongsToMany(models.Color, {
                through: models.Variant_Color,
                foreignKey: 'variant_id',
                otherKey: 'color_id'
            })

            this.hasMany(models.Cart_Item, {
                foreignKey: {
                    name: "variant_id",
                    allowNull: false
                },
                onDelete: "RESTRICT",
                onUpdate: "CASCADE"
            })

            this.belongsToMany(models.Cart, {
                through: models.Cart_Item,
                foreignKey: "cart_id",
                otherKey: "variant_id"
            })
        }
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
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    modelName: "Variant",
    tableName: "variants",
    paranoid: true
  })

  return Variants
}
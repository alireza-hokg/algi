const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      this.hasMany(models.Cart_Item, {
        foreignKey: {
          name: "cart_id",
          allowNull: false
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
      })
      
      this.belongsToMany(models.Variant, {
        through: {
          model: models.Cart_Item,
          unique: false
        },
        foreignKey: "cart_id",
        otherKey: "variant_id",
      })
    }
  }

  Cart.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1
        }
    },
    status: {
        type: DataTypes.ENUM("active", "abandoned", "purchased"),
        defaultValue: "active",
        validate: {
            isIn: [["active", "purchased", "abandoned"]]
        }
    },
    total_price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    discount_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    final_price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: "Cart",
    tableName: "carts",
    paranoid: true
  })
  return Cart;
}
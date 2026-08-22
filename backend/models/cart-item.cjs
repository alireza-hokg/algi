const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class CartItem extends Model {
        static associate(models) {
            this.belongsTo(models.Variant, {
                foreignKey: {
                    name: "variant_id",
                    allowNull: false
                },
                onDelete: "RESTRICT",
                onUpdate: "CASCADE"
            })
            
            this.belongsTo(models.Cart, {
                foreignKey: {
                    name: "cart_id",
                    allowNull: false
                },
                onDelete: "RESTRICT",
                onUpdate: "CASCADE"
            })
        }
    }

    CartItem.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    cart_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    variant_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
        validate: {
            isInt: true,
            min: 1
        }
    },
    unit_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0
        }
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    discount_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    final_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    }, {
        timestamps: true,
        sequelize,
        modelName: "Cart_Item",
        tableName: "cart_items",
        paranoid: true
    })
    return CartItem
}
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class CartItem extends Model {
        static associations(models) {
            this.belongsTo(models.Product, {
                foreignKey: {
                    name: "product_id",
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
    product_id: {
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
    unitPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0
        }
    },
    totalprice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    discountAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    finalPrice: {
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

    CartItem.associate = function(models) {
        this.belongsTo(models.Cart, {
            foreignKey: "cart_id",
            targetKey: "id",
            onUpdate: "CASCADE",
            onDelete: "RESTRICT"
        })

        this.belongsTo(models.Product, {
            foreignKey: "product_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        })
    }
    return CartItem
}
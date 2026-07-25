const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ColorVariant extends Model {
    static associate(models) {
      this.belongsTo(models.Variant, {
        foreignKey: {
          name: "variant_id",
          allowNull: false,
        },
        targetKey: "id",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
      })
  
      this.belongsTo(models.Color, {
        foreignKey: {
          name: "color_id",
          allowNull: false,
        },
        targetKey: "id",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
      })
    }
  }

  ColorVariant.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    color_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    variant_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    stock_quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0
    },
    is_primary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: 'ColorVariant',
    tableName: "colors_variants",
    indexes: [
      {
        unique: true,
        fields: ["color_id", "variant_id"],
        name: "colors_variants_color_id_variant_id_unq"
      }
    ]
  });
  
  return ColorVariant
}
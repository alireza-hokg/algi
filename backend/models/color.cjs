const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
      this.hasMany(models.ColorVariant, {
        foreignKey: {
          allowNull: false,
          name: "color_id",
        },
        targetKey: "id",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      })
  
      this.belongsToMany(models.Variant, {
        through: "colors_variants",
        foreignKey: "variant_id",
        otherKey: "color_id"
      })
    }
  }
  
  Color.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    hex: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Color',
    tableName: "colors"
  });
  
  return Color
}
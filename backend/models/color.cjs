const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
      this.hasMany(models.Variant_Color, {
        foreignKey: {
          allowNull: false,
          name: "color_id",
        },
        targetKey: "id",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      })
  
      this.belongsToMany(models.Variant, {
        through: "Variant_Color",
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
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Color',
    tableName: "colors",
    paranoid: true
  });
  
  return Color
}
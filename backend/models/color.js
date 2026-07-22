'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    
  }
  Color.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    variant_id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    timestamps,
    sequelize,
    modelName: 'Color',
  });

  Color.associations = function(models) {
    this.belongsTo(models.Variant, {
      foreignKey: {
        allowNull: false,
        name: "variant_id",
      },
      targetKey: "id",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    })
  }
  return Color;
};
"use strict"
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate = function(models) {
      this.hasMany(models.Order, {
        foreignKey: {
          name: "user_id",
          allowNull: false
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
      })
    }
  }
  
  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING(11),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(
        "admin",
        "customer"
      ),
      defaultValue: "customer",
      allowNull: false
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: "User",
    tableName: "users",
    paranoid: true
  })

  return User
}
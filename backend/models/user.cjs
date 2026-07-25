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
    phoneNumber: {
      type: DataTypes.STRING,
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
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: "User",
    tableName: "users"
  })

  return User
}
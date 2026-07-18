"use strict"
import { Model } from "sequelize"

export default (sequelize, DataTypes) => {
  class User extends Model {

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
    modelName: "User"
  })

  User.associations = function(models) {
    
  }

  return User
}
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Product = require("./product.cjs")(sequelize, Sequelize.DataTypes)
db.Variant = require("./variants.cjs")(sequelize, Sequelize.DataTypes)
db.User = require("./user.cjs")(sequelize, Sequelize.DataTypes)
db.Product_Image = require("./product-image.cjs")(sequelize, Sequelize.DataTypes)
db.Order = require("./order.cjs")(sequelize, Sequelize.DataTypes)
db.Order_Item = require("./order-item.cjs")(sequelize, Sequelize.DataTypes)
db.Variant_Color = require("./variant-color.cjs")(sequelize, Sequelize.DataTypes)
db.Color = require("./color.cjs")(sequelize, Sequelize.DataTypes)
db.Category = require("./categories.cjs")(sequelize, Sequelize.DataTypes)
db.Cart = require("./cart.cjs")(sequelize, Sequelize.DataTypes)
db.Cart_Item = require("./cart-item.cjs")(sequelize, Sequelize.DataTypes)

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.slice(-3) === '.js' || file.slice(-4) === '.cjs') &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

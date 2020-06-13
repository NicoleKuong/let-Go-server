const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../user/model");

const Item = db.define("item", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  availableDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

Item.belongsTo(User);
User.hasMany(Item);

module.exports = Item;

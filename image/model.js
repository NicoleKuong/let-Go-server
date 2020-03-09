const Sequelize = require("sequelize");
const db = require("../db");
const Item = require("../item/model");

const Image = db.define("image", {
  imageUrl: {
    type: Sequelize.STRING
  }
});

Image.belongsTo(Item);
Item.hasMany(Image);

module.exports = Image;

const db = require("../db");
const Sequelize = require("sequelize");

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  streetName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  houseNumber: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  telephoneNumber: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  latitude: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  longitude: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
});

module.exports = User;

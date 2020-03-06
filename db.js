const Sequelize = require("sequelize");

const dataBaseURL =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";

const db = new Sequelize(dataBaseURL);

db.sync({ force: true })
  .then(() => console.log("Database connected"))
  .catch(console.error);

module.exports = db;

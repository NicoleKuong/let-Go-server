const Sequelize = require("sequelize");

const dataBaseURL =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";

console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);
const db = new Sequelize(dataBaseURL);

db.sync({ force: false })
  .then(() => console.log("Database connected"))
  .catch(console.error);

module.exports = db;

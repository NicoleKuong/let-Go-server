const Sequelize = require("sequelize");

// const dataBaseURL =
//   process.env.DATABASE_URL ||
//   "postgres://postgres:secret@localhost:5432/postgres";

const dataBaseURL =
  "postgres://pgvctzbtjvzahi:dbcdf08ff8c839c30a0839a5611edce821b3c3ce60571e08efa6d77c615115fc@ec2-54-75-229-28.eu-west-1.compute.amazonaws.com:5432/df3jou5m3kvfvo";

console.log("process.env.DATABASE_URL", dataBaseURL);
const db = new Sequelize(dataBaseURL);

db.sync({ force: true })
  .then(() => console.log("Database connected"))
  .catch(console.error);

module.exports = db;

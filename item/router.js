const { Router } = require("express");
const Sequelize = require("sequelize");
const Item = require("./model");
// const auth = require("../auth/middleware");

const router = new Router();

//create event
//need auth
router.post("/items", async (request, response, next) => {
  console.log("create item ", request.body);
  try {
    const newItem = await Item.create(request.body);
    response.send(newItem);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

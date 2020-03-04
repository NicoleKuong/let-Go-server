const { Router } = require("express");
const Sequelize = require("sequelize");
const Item = require("./model");
// const auth = require("../auth/middleware");

const router = new Router();

//create event
//need auth
router.post("/events", async (request, response, next) => {
  console.log("create event", request.body);
  try {
    const newEvent = await Event.create(request.body);
    response.send(newEvent);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

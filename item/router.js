const { Router } = require("express");
const Sequelize = require("sequelize");
// const auth = require("../auth/middleware");

const router = new Router();

//create event
router.post("/events", auth, async (request, response, next) => {
  console.log("create event", request.body);
  try {
    const newEvent = await Event.create(request.body);
    response.send(newEvent);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

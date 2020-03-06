const { Router } = require("express");
const User = require("../user/model");
const Item = require("./model");
// const auth = require("../auth/middleware");

const router = new Router();

//create item
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

router.get("/items", async (request, response, next) => {
  try {
    // const limit = request.query.limit || 9;
    // const offset = request.query.offset || 0;
    // console.log("current date", new Date());
    const items = await Item.findAll({
      include: [{ model: User }]
    });
    response.send(items);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

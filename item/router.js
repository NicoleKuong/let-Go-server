const { Router } = require("express");
const User = require("../user/model");
const Item = require("./model");
const Image = require("../image/model");
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

//get items
router.get("/items", async (request, response, next) => {
  try {
    // const limit = request.query.limit || 9;
    // const offset = request.query.offset || 0;
    // console.log("current date", new Date());
    const items = await Item.findAll({
      include: [{ model: User }, { model: Image }]
    });
    response.send(items);
  } catch (error) {
    next(error);
  }
});

//create imageUrl for that particular item

router.post("/items/:itemId/images", async (request, response, next) => {
  try {
    const links = request.body.imageUrl.imageUrl;
    const itemID = request.body.imageUrl.itemId;

    links.map(async link => {
      const newImage = await Image.create({ imageUrl: link, itemId: itemID });
      response.send(newImage);
    });
  } catch (error) {
    next(error);
  }
});

//get images for one particular item
router.get("/items/:itemId/images", async (request, response) => {
  try {
    const Images = await Image.findAll({
      where: { itemId: request.params.itemId },
      include: [{ model: User }]
    });
    response.send(Images);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

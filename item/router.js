const { Router } = require("express");
const User = require("../user/model");
const Item = require("./model");
const Image = require("../image/model");
const { Op } = require("sequelize");
const auth = require("../auth/middleware");

const router = new Router();

//create item and images
//need auth
router.post("/items", auth, async (request, response, next) => {
  console.log("create item ", request.body);
  try {
    const imageUrls = request.body.imageUrls;
    const newItem = await Item.create(request.body);
    await Promise.all(
      imageUrls.map(async link => {
        await Image.create({
          imageUrl: link,
          itemId: newItem.id
        });
      })
    );
    const newItemWithImages = await Item.findByPk(newItem.id, {
      include: [{ model: Image }, { model: User }]
    });
    response.send(newItemWithImages);
  } catch (error) {
    next(error);
  }
});

//get items
router.get("/items", async (request, response, next) => {
  try {
    const items = await Item.findAll({
      include: [{ model: User }, { model: Image }]
    });
    response.send(items);
    // console.log("items !!!", items);
  } catch (error) {
    next(error);
  }
});

router.get("/items/find/:keyword", async (request, response, next) => {
  const keyword = request.params.keyword;

  try {
    //find the users with the keyword location
    const users = await User.findAll({
      where: { city: { [Op.iLike]: `%${keyword}%` } }
    });

    //map through the user's id (result an array) to match in the item table's userId
    const userIds = users.map(user => user.dataValues.id);
    // console.log("an array of userIDs", userIds);
    const itemsWithCity = await Item.findAll({
      where: { userId: userIds },
      include: [{ model: Image }, { model: User }]
    });
    if (!itemsWithCity.length > 0) {
      response
        .status(404)
        .send({ message: "There is no item in this city yet." });
    } else {
      response.send(itemsWithCity);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const { Router } = require("express");
const User = require("../user/model");
const Item = require("./model");
const Image = require("../image/model");
// const auth = require("../auth/middleware");

const router = new Router();

//create item and images
//need auth
router.post("/items", async (request, response, next) => {
  // console.log("create item ", request.body);
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

//create imageUrl for that particular item

// router.post("/items/:itemId/images", async (request, response, next) => {
//   try {
//     const links = request.body.imageUrl.imageUrl;
//     // console.log("=====", links);
//     const itemID = request.body.imageUrl.itemId;

//     links.map(async link => {
//       const newImage = await Image.create({ imageUrl: link, itemId: itemID });
//       // console.log("++++++", newImage);
//       response.send(newImage);
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// //get images for one particular item
// router.get("/items/:itemId/images", async (request, response) => {
//   console.log("!!!!!!", request.body);
//   try {
//     const Images = await Image.findAll({
//       where: { itemId: request.params.itemId },
//       include: [{ model: User }, { model: Item }]
//     });
//     response.send(Images);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;

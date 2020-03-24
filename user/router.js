const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");
const { toJWT } = require("../auth/jwt");

const router = new Router();

//user signup
router.post("/user", async (request, response) => {
  // console.log("create user", request.body);
  if (!request.body.email || !request.body.password) {
    return response
      .status(400)
      .send("Missing email or password in request body");
  }

  const hashedPassword = bcrypt.hashSync(request.body.password, 10);

  try {
    await User.create({
      ...request.body,
      password: hashedPassword
    });

    response.status(201).send("User created");
  } catch (error) {
    //user email address not unique
    // console.log(error.name);
    switch (error.name) {
      case "SequelizeUniqueConstraintError": //in-built sequelize error
        return response.status(400).send({ message: error.errors[0].message });

      default:
        return response.status(400).send("Bad request");
    }
  }
});

module.exports = router;

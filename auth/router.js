const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const User = require("../user/model");
const bcrypt = require("bcrypt");
const auth = require("./middleware");

const router = new Router();

// define endpoints here
router.post("/login", (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    response.status(400).send({
      message: "Please supply a valid email and password"
    });
  } else {
    // 1. find user based on email address
    User.findOne({
      where: {
        email: request.body.email
      }
    })
      .then(entity => {
        if (!entity) {
          response.status(400).send({
            message: "User with that email does not exist"
          });
        }
        // 2. use bcrypt.compareSync to check the password against the stored hash
        else if (bcrypt.compareSync(request.body.password, entity.password)) {
          // console.log("entity info", entity);
          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          response.send({
            jwt: toJWT({ userId: entity.id }),
            user: entity
          });
        } else {
          response.status(400).send({
            message: "Password was incorrect"
          });
        }
      })
      .catch(error => {
        console.error(error);
        response.status(500).send({
          message: "Something went wrong"
        });
      });
  }
});

module.exports = router;

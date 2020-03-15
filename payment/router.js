const { Router } = require("express");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const stripe = require("stripe")(stripeSecretKey);
const uuid = require("uuid/v4");

const router = new Router();

router.post("/payment", async (request, response, next) => {
  console.log("payment", request.body);
  const { item, token } = request.body;
  console.log("product++", item);
  console.log("price ---", item.price);
  const idempontencyKey = uuid();
  try {
    // Create a new customer and then create an invoice item then invoice it:
    const newCustomers = await stripe.customers
      .create({
        email: token.email,
        source: token.id
      })
      .then(customer => {
        stripe.charges.create(
          {
            amount: item.price * 100,
            currency: "eur",
            customer: customer.id,
            receipt_email: token.email,
            description: `Rented the ${item.name}`,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_link1,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip
              }
            }
          },
          { idempontencyKey }
        );
      })
      .then(() => {
        console.log("Charge Successful");
        response.status(200).json({ message: "Successfully rented item" });
      });
  } catch (error) {
    console.log("Charge fail");
    next(error);
  }
});

module.exports = router;

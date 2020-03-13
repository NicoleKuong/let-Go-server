const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./user/router");
const authRouter = require("./auth/router");
const itemRouter = require("./item/router");
const emailRouter = require("./email/router");

const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware);

const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

app.use(userRouter);
app.use(authRouter);
app.use(itemRouter);
app.use(emailRouter);

app.get("/", (request, response, next) => {
  response.send("hello world");
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));

const express = require("./node_modules/express");
const cors = require("./node_modules/cors/lib");
const port = process.env.PORT || 4000;
// const userRouter = require("./user/router");
// const authRouter = require("./auth/router");
// const itemRouter = require("./item/router");

const bodyParser = require("./node_modules/body-parser");

const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware);

const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

// app.use(userRouter);
// app.use(authRouter);
// app.use(itemRouter);

app.get("/", (request, response, next) => {
  response.send("hello world");
});

app.listen(port, () => console.log(`Listening on port ${port}`));

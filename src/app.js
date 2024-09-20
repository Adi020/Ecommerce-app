const express = require("express");
require("./models");

const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const { xss } = require("express-xss-sanitizer");

const globalErrorHandler = require("./middlewares/error.middleware");
const { routeNotFound } = require("./controllers/v1/all.controller");

const v1Router = require("./routes/v1");
const limitRequest = require("./utils/rateLimit");

const app = express();

const limiter = limitRequest(1000, 60 * 60 * 1000, "too many request from this ip, please try again in an hour");

app.use(express.json({ limit: "4kb" }));
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(xss());

app.use(limiter);

app.use("/api/v1", v1Router);
app.all("*", routeNotFound);

app.use(globalErrorHandler);

module.exports = app;

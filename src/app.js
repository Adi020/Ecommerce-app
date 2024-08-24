const express = require('express');
require('./models');

const cors = require('cors');
const { default: rateLimit } = require('express-rate-limit');
const { default: helmet } = require('helmet');
const hpp = require('hpp');
const { xss } = require('express-xss-sanitizer');

const globalErrorHandler = require('./middlewares/error.middleware');
const { routeNotFound } = require('./controllers/v1/all.controller');

const v1Router = require('./routes/v1');

const app = express();
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'too many request from this ip, please try again in an hour',
});

app.use(express.json({ limit: '4kb' }));
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(xss());

app.use(limiter);

app.use('/api/v1', v1Router);
app.all('*', routeNotFound);

app.use(globalErrorHandler);

module.exports = app;

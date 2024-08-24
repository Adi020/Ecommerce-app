const express = require('express');
const { createRating } = require('../../controllers/v1/rating.controller');
const { protect } = require('../../middlewares/auth.middleware');

const ratingRouter = express.Router();

ratingRouter.use(protect);

ratingRouter.route('/').post(createRating);

module.exports = ratingRouter;

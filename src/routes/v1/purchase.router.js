const {
  getAllPurchases,
  createPurchase,
} = require('../../controllers/v1/purchase.controller');
const express = require('express');
const { protect } = require('../../middlewares/auth.middleware');
const {} = require('../../middlewares/productCart.middleware');
const {
  createRatingValidation,
} = require('../../middlewares/validations.middleware');

const purchaseRouter = express.Router();

purchaseRouter.use(protect);

purchaseRouter
  .route('/')
  .get(getAllPurchases)
  .post(createRatingValidation, createPurchase);

module.exports = purchaseRouter;

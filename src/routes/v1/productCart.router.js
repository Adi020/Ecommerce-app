const {
  getAllProductsCart,
  createProductCart,
  updateProductCart,
  deleteProductCart,
} = require('../../controllers/v1/productCart.controller');

const express = require('express');
const { protect } = require('../../middlewares/auth.middleware');
const {
  validProductCartPerCreate,
  validProductCart,
} = require('../../middlewares/productCart.middleware');
const {
  ProductCartValidation,
} = require('../../middlewares/validations.middleware');

const productCartRouter = express.Router();

productCartRouter.use(protect);

productCartRouter
  .route('/')
  .get(getAllProductsCart)
  .post(ProductCartValidation, validProductCartPerCreate, createProductCart)
  .patch(ProductCartValidation, validProductCart, updateProductCart)
  .delete(validProductCart, deleteProductCart);

module.exports = productCartRouter;

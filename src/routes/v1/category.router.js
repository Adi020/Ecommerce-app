const {
  getAllCategories,
  createCategory,
} = require('../../controllers/v1/category.controller');
const express = require('express');
const { protect } = require('../../middlewares/auth.middleware');
const {
  createCategoryValidation,
} = require('../../middlewares/validations.middleware');

const categoryRouter = express.Router();

categoryRouter
  .route('/')
  .get(getAllCategories)
  .post(protect, createCategoryValidation, createCategory);

module.exports = categoryRouter;

const Category = require('../../models/category.model');
const catchError = require('../../utils/catchError');

const getAllCategories = catchError(async (req, res) => {
  const categories = await Category.findAll();
  return res.json({
    status: 'success',
    message: 'categories successfully brought',
    categories,
  });
});

const createCategory = catchError(async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name });
  return res.json({
    status: 'success',
    message: 'categories successfully brought',
    category,
  });
});
module.exports = {
  getAllCategories,
  createCategory,
};

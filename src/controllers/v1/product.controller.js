const catchError = require('../../utils/catchError');

const Product = require('../../models/product.model');
const ProductImg = require('../../models/productImg.model');
const { UploadFile } = require('../../utils/firebase-image-cloud');
const { Op } = require('sequelize');
const AppError = require('../../utils/appError');
const Category = require('../../models/category.model');
const Rating = require('../../models/rating.model');
const obfuscateName = require('../../utils/ofuscName');

const getMyProducts = catchError(async (req, res) => {
  const { id: userId } = req.sessionUser;
  const products = await Product.findAll({
    where: { userId, [Op.or]: [{ status: 'active' }, { status: 'pause' }] },
    include: [{ model: ProductImg, attributes: ['id', 'productImgUrl'] }],
  });
  return res.json({
    status: 'success',
    message: 'products successfully brought',
    results: products.length,
    products,
  });
});

const getProducts = catchError(async (req, res) => {
  const { categories, title, min_price, max_price } = req.query;
  let where = {
    status: 'active',
  };
  if (min_price) where.price = { [Op.gte]: min_price };
  if (max_price) where.price = { ...where.price, [Op.lte]: max_price };

  if (title) {
    where.title = { [Op.iLike]: `%${title}%` };
  }

  let whereCategories = {};

  if (categories)
    whereCategories = {
      name: { [Op.in]: categories.split(',') },
    };

  const products = await Product.findAll({
    where: where,
    attributes: [
      'id',
      'title',
      'description',
      'price',
      'availableQuantity',
      'sales',
    ],
    include: [
      {
        model: ProductImg,
        attributes: ['id', 'productImgUrl'],
        where: { status: 'active' },
        required: false,
      },
      {
        model: Category,
        attributes: ['id', 'name'],
        where: whereCategories,
      },
      {
        model: Rating,
        attributes: ['id', 'rating'],
      },
    ],
  });
  return res.json({
    status: 'success',
    message: 'products successfully brought',
    results: products.length,
    products,
  });
});

const getProduct = catchError(async (req, res) => {
  const { product } = req;

  product.ratings.forEach(({ user }) => {
    user.firstName = obfuscateName(user.firstName);
  });

  return res.json({
    status: 'success',
    message: 'product brought successfully',
    product,
  });
});

const createProduct = catchError(async (req, res) => {
  const { sessionUser, files } = req;
  const { title, description, price, brand, availableQuantity, categoryId } =
    req.body;

  const product = await Product.create({
    title,
    description,
    price,
    brand,
    categoryId,
    availableQuantity,
    userId: sessionUser.id,
  });

  if (files.length > 0) {
    const productImgsPromises = files.map(async (file) => {
      const imgUrl = await UploadFile.uploadToFirebase(
        `products/${product.id}`,
        file
      );
      return await ProductImg.create({
        productId: product.id,
        productImgUrl: imgUrl,
      });
    });
    await Promise.all(productImgsPromises);
  }

  const result = await Product.findByPk(product.id, {
    include: [{ model: ProductImg, attributes: ['id', 'productImgUrl'] }],
  });

  return res.status(201).json({
    status: 'success',
    message: 'product created successfully',
    product: result,
  });
});

const removeProduct = catchError(async (req, res) => {
  const { product } = req;
  await product.update({ status: 'inactive' });
  return res.json({
    status: 'success',
    message: 'product deleted successfully',
  });
});

const updateProduct = catchError(async (req, res) => {
  const { product } = req;
  const { title, description, price, brand, availableQuantity } = req.body;

  await product.update({
    title: title.toLowerCase().trim(),
    description: description.toLowerCase().trim(),
    brand: brand.toLowerCase().trim(),
    price,
    availableQuantity,
  });

  return res.json({
    status: 'success',
    message: 'product updated successfully',
  });
});

const updateProductImages = catchError(async (req, res, next) => {
  const { product, files } = req;
  const { productImgs } = product;

  const limit = 5;

  if (productImgs.length + files.length > limit)
    return next(new AppError(`limit of ${limit} images exceeded`, 400));

  const productImgsPromises = files.map(async (file) => {
    const imgUrl = await UploadFile.uploadToFirebase('products', file);
    return await ProductImg.create({
      productId: product.id,
      productImgUrl: imgUrl,
    });
  });
  await Promise.all(productImgsPromises);

  return res.json({
    status: 'success',
    message: 'product images updated successfully',
  });
});

const deleteProductImages = catchError(async (req, res) => {
  const { productImgs } = req.product;
  const { deleteProductImgs } = req.body;

  const productImgsPromises = productImgs.map((productImg) => {
    if (deleteProductImgs.includes(productImg.id)) {
      return productImg.update({ status: 'inactive' });
    }
  });
  await Promise.all(productImgsPromises);

  return res.json({
    status: 'success',
    message: 'product images deleted successfully',
  });
});

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  removeProduct,
  updateProduct,
  getMyProducts,
  updateProductImages,
  deleteProductImages,
};

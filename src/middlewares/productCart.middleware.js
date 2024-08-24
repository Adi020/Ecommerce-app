const { Op } = require('sequelize');
const Product = require('../models/product.model');
const AppError = require('../utils/appError');
const catchError = require('../utils/catchError');
const ProductCart = require('../models/productCart.model');
const ProductImg = require('../models/productImg.model');

const validProductCartPerCreate = catchError(async (req, res, next) => {
  const { productId: id } = req.body;
  const product = await Product.findOne({
    where: { id, [Op.or]: [{ status: 'active' }, { status: 'pause' }] },
    include: {
      model: ProductCart,
      where: { userId: req.sessionUser.id },
      required: false,
    },
  });
  if (!product) {
    return next(new AppError('product not found', 404));
  }
  if (product.status === 'pause') {
    return next(new AppError('product not available', 400));
  }
  req.product = product;
  req.productCart = product.productCarts[0];
  next();
});

const validProductCart = catchError(async (req, res, next) => {
  const { id: userId } = req.sessionUser;
  const { productId: id } = req.body;
  const productCart = await ProductCart.findOne({
    where: {
      id,
      userId,
      [Op.or]: [{ status: 'active' }, { status: 'pause' }],
    },
    include: {
      model: Product,
    },
  });

  if (!productCart) {
    return next(new AppError('productCart not found', 404));
  }

  if (productCart.status === 'pause') {
    return next(new AppError('product not available', 400));
  }

  req.product = productCart.product;
  req.productCart = productCart;
  next();
});

const findProductsCart = catchError(async (req, res, next) => {
  const { id } = req.sessionUser;
  const productsCart = await ProductCart.findAll({
    where: { userId: id },
    include: {
      model: Product,
      include: { model: ProductImg, attributes: ['id', 'productImgUrl'] },
      attributes: ['id', 'title', 'description', 'availableQuantity'],
    },
    attributes: ['id', 'quantity'],
  });
  req.productsCart = productsCart;
  next();
});

module.exports = {
  validProductCartPerCreate,
  validProductCart,
  findProductsCart,
};

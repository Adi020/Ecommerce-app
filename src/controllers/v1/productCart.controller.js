const Product = require('../../models/product.model');
const ProductCart = require('../../models/productCart.model');
const ProductImg = require('../../models/productImg.model');
const AppError = require('../../utils/appError');
const catchError = require('../../utils/catchError');

const getAllProductsCart = catchError(async (req, res) => {
  const { id } = req.sessionUser;
  const productsCart = await ProductCart.findAll({
    where: { userId: id },
    include: {
      model: Product,
      include: { model: ProductImg, attributes: ['id', 'productImgUrl'] },
      attributes: ['id', 'title', 'description', 'availableQuantity'],
    },
    attributes: ['id', 'quantity', 'status'],
  });
  return res.json({
    status: 'success',
    message: 'productsCart successfully brought',
    results: productsCart.length,
    productsCart,
  });
});

const createProductCart = catchError(async (req, res, next) => {
  const { product, productCart, sessionUser } = req;
  const { quantity } = req.body;

  if (product.userId === sessionUser.id) {
    return next(new AppError("you can't buy your products", 400));
  }
  if (
    productCart &&
    productCart.quantity + quantity > product.availableQuantity
  ) {
    return next(new AppError('quantity is greater than available', 400));
  }
  if (
    productCart &&
    productCart.quantity + quantity <= product.availableQuantity
  ) {
    const cartProduct = await productCart.update({
      quantity: quantity + productCart.quantity,
    });
    return res.json({
      status: 'success',
      message: 'productCart create successfully',
      cartProduct,
    });
  }

  const cartProduct = await ProductCart.create({
    userId: sessionUser.id,
    productId: product.id,
    quantity,
  });

  return res.json({
    status: 'success',
    message: 'productCart create successfully',
    cartProduct,
  });
});

const updateProductCart = catchError(async (req, res, next) => {
  const { product, productCart } = req;
  const { quantity } = req.body;

  if (quantity > product.availableQuantity) {
    return next(new AppError('quantity is greater than available', 400));
  }

  const cartProduct = await productCart.update({ quantity });
  return res.json({
    status: 'success',
    message: 'productCart create successfully',
    cartProduct,
  });
});

const deleteProductCart = catchError(async (req, res, next) => {
  const { productCart } = req;

  await productCart.destroy();

  return res.json({
    status: 'success',
    message: 'productCart delete successfully',
  });
});

module.exports = {
  getAllProductsCart,
  createProductCart,
  updateProductCart,
  deleteProductCart,
};

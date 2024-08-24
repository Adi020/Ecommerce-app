const Product = require('../../models/product.model');
const ProductCart = require('../../models/productCart.model');
const ProductImg = require('../../models/productImg.model');
const Purchase = require('../../models/purchase.model');
const Rating = require('../../models/rating.model');
const catchError = require('../../utils/catchError');

const getAllPurchases = catchError(async (req, res) => {
  const purchases = await Purchase.findAll({
    where: { userId: req.sessionUser.id },
    attributes: ['id', 'quantity', 'price', 'createdAt'],
    include: [
      {
        model: Product,
        attributes: ['id', 'title', 'price', 'brand'],
        include: {
          model: ProductImg,
          attributes: ['id', 'productImgUrl'],
          where: { status: 'active' },
        },
      },
      { model: Rating, attributes: ['rating'] },
    ],
  });
  return res.json({
    status: 'success',
    message: 'purchases successfully brought',
    purchases,
  });
});

const createPurchase = catchError(async (req, res) => {
  const { id: userId } = req.sessionUser;
  const productsCart = await ProductCart.findAll({
    where: { userId },
    attributes: ['id', 'quantity', 'userId', 'productId'],
    include: { model: Product },
  });

  const purchases = productsCart.map(async (productCart) => {
    const { userId, productId, quantity, product } = productCart;
    const purchase = await Purchase.create({
      userId,
      productId,
      quantity,
      price: product.price,
    });
    await product.update({
      availableQuantity: product.availableQuantity - quantity,
      sales: product.sales + quantity,
    });
    await productCart.destroy();
    return purchase;
  });

  await Promise.all(purchases);

  return res.json({
    status: 'success',
    message: 'cart successfully purchased',
  });
});

module.exports = {
  getAllPurchases,
  createPurchase,
};

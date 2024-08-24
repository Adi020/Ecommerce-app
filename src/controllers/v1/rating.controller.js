const Product = require('../../models/product.model');
const Purchase = require('../../models/purchase.model');
const Rating = require('../../models/rating.model');
const AppError = require('../../utils/appError');
const catchError = require('../../utils/catchError');

const createRating = catchError(async (req, res, next) => {
  const { sessionUser } = req;
  const { comment, purchaseId, rating } = req.body;
  const purchase = await Purchase.findOne({
    where: { id: purchaseId, userId: sessionUser.id },
    include: {
      model: Product,
    },
  });
  if (!purchase) return next(new AppError('purchase not found'));

  if (purchase.rating)
    return next(new AppError('you have already rating this purchase'));

  const purchaseRating = await Rating.create({
    rating,
    comment,
    purchaseId,
    productId: purchase.product.id,
    userId: sessionUser.id,
  });

  return res.json({
    status: 'success',
    message: 'rate successfully brought',
    purchaseRating,
  });
});

module.exports = { createRating };

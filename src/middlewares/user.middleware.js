const Product = require('../models/product.model');
const ProductImg = require('../models/productImg.model');
const Purchase = require('../models/purchase.model');
const Rating = require('../models/rating.model');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchError = require('../utils/catchError');

const validUser = catchError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id, status: 'active' } });
  if (!user) {
    return next(new AppError('user not found', 404));
  }
  req.user = user;
  next();
});

const validUserAdmin = catchError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id, role: 'user' },
  });
  if (!user) {
    return next(new AppError('user not found', 404));
  }
  req.user = user;
  next();
});

const validUserSession = (req, res, next) => {
  req.user = req.sessionUser;
  next();
};

module.exports = { validUser, validUserSession, validUserAdmin };

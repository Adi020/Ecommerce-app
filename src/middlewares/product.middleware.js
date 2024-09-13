const { Op } = require("sequelize");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchError = require("../utils/catchError");
const ProductImg = require("../models/productImg.model");
const Rating = require("../models/rating.model");
const Purchase = require("../models/purchase.model");
const { raw } = require("express");

const validProductUser = catchError(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;
  const product = await Product.findOne({
    where: {
      id,
      [Op.or]: [{ status: "active" }, { status: "pause" }],
      userId: sessionUser.id,
    },
    include: [
      {
        model: ProductImg,
        attributes: ["id", "productImgUrl"],
      },
    ],
  });
  if (!product) return next(new AppError("product not found", 404));
  req.product = product;
  next();
});

const validProductAdmin = catchError(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOne({
    where: { id },
    include: [User, ProductImg],
  });
  if (!product) return next(new AppError("product not found", 404));
  req.product = product;
  next();
});

const validProductPerFindOne = catchError(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOne({
    where: { id, [Op.or]: [{ status: "active" }, { status: "pause" }] },
    attributes: ["id", "title", "description", "price", "brand", "status"],
    include: [
      {
        model: User,
        attributes: ["firstName", "profileImgUrl"],
      },
      {
        model: ProductImg,
        attributes: ["id", "productImgUrl"],
        where: { status: "active" },
        required: false,
      },
      {
        model: Rating,
        include: {
          model: User,
          attributes: ["firstName", "profileImgUrl"],
        },
        attributes: ["id", "rating", "comment", "createdAt"],
      },
    ],
  });

  if (!product) {
    return next(new AppError("product not found", 404));
  }

  req.product = product;
  next();
});

module.exports = {
  validProductUser,
  validProductPerFindOne,
  validProductAdmin,
};

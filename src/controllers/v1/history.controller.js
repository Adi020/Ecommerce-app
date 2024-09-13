const { Result } = require("express-validator");
const ProductHistory = require("../../models/history.model");
const Product = require("../../models/product.model");
const ProductImg = require("../../models/productImg.model");
const catchError = require("../../utils/catchError");

const getAllProductHistory = catchError(async (req, res) => {
  const { id } = req.sessionUser;
  const productHistory = await ProductHistory.findAll({
    where: { userId: id },
    attributes: ["id", "createdAt"],
    include: [
      {
        model: Product,
        attributes: ["id", "title", "price", "brand"],
        include: [
          {
            model: ProductImg,
            attributes: ["id", "productImgUrl"],
          },
        ],
      },
    ],
  });
  return res.json({
    status: "success",
    message: "productHistory brought successfully",
    results: productHistory.length,
    productHistory,
  });
});

const deleteProductHistory = catchError(async (req, res) => {
  const { id } = req.params;
  const { sessionUser } = req;
  await ProductHistory.destroy({ where: { id, userId: sessionUser.id } });
  return res.sendStatus(204);
});

module.exports = {
  getAllProductHistory,
  deleteProductHistory,
};

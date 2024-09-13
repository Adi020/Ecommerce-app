const {
  getAllProductHistory,
  deleteProductHistory,
} = require("../../controllers/history.controller");
const express = require("express");
const { protect } = require("../../middlewares/auth.middleware");

const productHistoryRouter = express.Router();

productHistoryRouter.use(protect);

productHistoryRouter.route("/").get(getAllProductHistory);

productHistoryRouter.route("/:id").delete(deleteProductHistory);

module.exports = productHistoryRouter;

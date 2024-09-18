const {
  getProducts,
  createProduct,
  getProduct,
  removeProduct,
  updateProduct,
  getMyProducts,
  updateProductImages,
  deleteProductImages,
  getProductsFiltered,
} = require("../../controllers/v1/product.controller");
const express = require("express");
const upload = require("../../utils/multer");
const {
  protect,
  restrictTo,
  tokenBypass,
} = require("../../middlewares/auth.middleware");
const {
  validProductPerFindOne,
  validProductUser,
  validProductAdmin,
} = require("../../middlewares/product.middleware");
const {
  dataProductValidation,
  deleteProductImagesValidation,
  filterProducstValidation,
} = require("../../middlewares/validations.middleware");

const productRouter = express.Router();

productRouter
  .route("/")
  .get(filterProducstValidation, getProducts)
  .post(
    protect,
    upload.array("productImgs", 5),
    dataProductValidation,
    createProduct
  );

productRouter.route("/search").get(getProductsFiltered);
productRouter.route("/me").get(protect, getMyProducts);

productRouter
  .use("/me/:id", protect, validProductUser)
  .route("/me/:id")
  .delete(removeProduct)
  .patch(dataProductValidation, updateProduct);

productRouter
  .use("/me/:id/images", protect, validProductUser)
  .route("/me/:id/images")
  .patch(upload.array("productImgs", 5), updateProductImages)
  .delete(deleteProductImagesValidation, deleteProductImages);

productRouter
  .route("/:id")
  .get(tokenBypass, validProductPerFindOne, getProduct)
  .delete(protect, restrictTo("admin"), validProductAdmin, removeProduct)
  .patch(
    protect,
    restrictTo("admin"),
    validProductAdmin,
    dataProductValidation,
    updateProduct
  );

module.exports = productRouter;

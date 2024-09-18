const { body, query, validationResult } = require("express-validator");

const validFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.mapped(),
    });
  }

  next();
};

const signUpuserValidations = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("firstName is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("firstName must contain at least 3 characters.")
    .bail()
    .toLowerCase(),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("lastName is  required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("lastName must contain at least 3 characters.")
    .bail()
    .toLowerCase(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("enter a valid email")
    .bail()
    .toLowerCase(),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters")
    .bail()
    .matches(/[\W+|_+|A-Z+|\d+]/)
    .withMessage("the password must contain capital letters or symbols"),
  body("phone")
    .notEmpty()
    .withMessage("phone is required")
    .bail()
    .isMobilePhone("any")
    .withMessage("enter a phone number valid")
    .bail()
    .isNumeric()
    .withMessage("phone must be a number")
    .bail(),
  validFields,
];

const signInUserValidations = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("enter a valid email")
    .bail()
    .toLowerCase(),
  body("password").notEmpty().withMessage("password is required"),
  validFields,
];

const updateUserValidations = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("firstName is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("firstName must contain at least 3 characters.")
    .bail()
    .toLowerCase(),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("lastName is  required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("lastName must contain at least 3 characters.")
    .bail()
    .toLowerCase(),
  body("phone")
    .notEmpty()
    .withMessage("phone is required")
    .bail()
    .isMobilePhone("any")
    .withMessage("enter a phone number valid")
    .bail()
    .isNumeric()
    .withMessage("phone must be a number")
    .bail(),
  validFields,
];

const updatePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters")
    .bail()
    .matches(/[\W+|_+|A-Z+|\d+]/)
    .withMessage("password must contain capital letters or symbols")
    .bail(),
  validFields,
];

const dataProductValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("title is required")
    .bail()
    .isLength({ min: 4 })
    .withMessage("title must contain at least 4 characters")
    .bail(),
  body("description").trim().toLowerCase(),
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .bail()
    .isFloat({ min: 1 })
    .withMessage("price must be at least 1")
    .bail()
    .isNumeric()
    .withMessage("price must be a number")
    .bail()
    .matches(/^\d+(\.\d{1,2})?$/)
    .withMessage("price must have a maximum of two decimal places")
    .bail(),
  body("brand")
    .trim()
    .notEmpty()
    .withMessage("brand is required")
    .isLength({ min: 4 })
    .withMessage("brand must contain at least 4 characters")
    .bail()
    .notEmpty()
    .withMessage("brand is required")
    .bail(),
  body("availableQuantity")
    .notEmpty()
    .withMessage("availableQuantity is required")
    .bail()
    .isNumeric()
    .withMessage("availableQuantity must be a number")
    .bail()
    .isInt({ min: 0 })
    .withMessage("availableQuantity must be a positive integer or zero.")
    .bail(),
  validFields,
];

const deleteProductImagesValidation = [
  body("deleteProductImgs")
    .notEmpty()
    .withMessage("deleteProductImgs is require")
    .bail()
    .isArray()
    .withMessage("deleteProductImgs field must be an array")
    .bail()
    .custom((value) => {
      if (value.length < 1 || value.length > 5) {
        throw new Error(
          "deleteProductImgs must have between 1 and 5 elements."
        );
      }
      const uniqueIds = new Set(value);
      if (uniqueIds.size !== value.length) {
        throw new Error("Los IDs en deleteProductImgs no deben repetirse");
      }
      for (const id of value) {
        if (!/^\d+$/.test(id)) {
          throw new Error(
            "each ID in deleteProductImgs must be a valid integer"
          );
        }
      }
      return true;
    }),
  validFields,
];
const ProductCartValidation = [
  body("quantity")
    .notEmpty()
    .withMessage("quantity is required")
    .isInt({ min: 1 })
    .withMessage("quantity must be a positive integer")
    .toInt(),
  body("productId")
    .notEmpty()
    .withMessage("productId is required")
    .isInt({ min: 1 })
    .withMessage("productId must be a positive integer")
    .toInt(),
  validFields,
];

const createRatingValidation = [
  body("purchaseId")
    .notEmpty()
    .withMessage("purchaseId is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("purchaseId must be a positive integer")
    .bail()
    .toInt(),
  body("rating")
    .notEmpty()
    .withMessage("purchaseId is required")
    .bail()
    .isInt({ min: 1, max: 5 })
    .withMessage("purchaseId must be a positive integer")
    .toInt(),
  validFields,
];

const createCategoryValidation = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("name must contain at least 3 characters"),
  validFields,
];

const filterProducstValidation = [
  query("min_price")
    .optional()
    .isNumeric()
    .withMessage("min_price must be a number")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("min_price must be a number greater than or equal to 0")
    .bail()
    .toFloat(),
  query("max_price")
    .optional()
    .isNumeric()
    .withMessage("max_price must be a number")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("max_price must be a number greater than or equal to 0")
    .bail()
    .toFloat(),
  validFields,
];

module.exports = {
  signUpuserValidations,
  signInUserValidations,
  updateUserValidations,
  updatePasswordValidation,
  dataProductValidation,
  deleteProductImagesValidation,
  ProductCartValidation,
  createRatingValidation,
  createCategoryValidation,
  filterProducstValidation,
};

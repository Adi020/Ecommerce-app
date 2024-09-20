const express = require("express");
const {
  signUp,
  signIn,
  updatePassword,
} = require("../../controllers/v1/auth.controller");
const {
  signInUserValidations,
  signUpuserValidations,
  updatePasswordValidation,
  validationId,
} = require("../../middlewares/validations.middleware");
const { protect, validPassword } = require("../../middlewares/auth.middleware");
const { validUserAdmin } = require("../../middlewares/user.middleware");

const authRouter = express.Router();

authRouter.post("/signup", signUpuserValidations, signUp);
authRouter.post("/signin", signInUserValidations, signIn);

authRouter.use(protect);

authRouter.patch(
  "/password/me",
  protect,
  validPassword,
  updatePasswordValidation,
  updatePassword
);

authRouter.patch(
  "/password/:id",
  validationId,
  validUserAdmin,
  updatePasswordValidation,
  updatePassword
);

module.exports = authRouter;

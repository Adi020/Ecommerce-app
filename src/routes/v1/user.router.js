const express = require("express");
const {
  getUser,
  getUsers,
  removeUser,
  updateUser,
  updateProfileImage,
  deleteProfileImage,
} = require("../../controllers/v1/user.controller");
const {
  validUserSession,
  validUserAdmin,
} = require("../../middlewares/user.middleware");
const {
  updateUserValidations,
  validationId,
} = require("../../middlewares/validations.middleware");
const { protect, restrictTo } = require("../../middlewares/auth.middleware");
const upload = require("../../utils/multer");

const userRouter = express.Router();

userRouter.use(protect);

userRouter.route("/").get(restrictTo("admin"), getUsers);

userRouter
  .use("/me", validUserSession)
  .route("/me")
  .get(getUser)
  .patch(updateUserValidations, updateUser)
  .delete(removeUser);

userRouter
  .route("/me/profile-image")
  .patch(upload.single("profileImgUrl"), updateProfileImage)
  .delete(deleteProfileImage);

userRouter
  .use("/:id", restrictTo("admin"), validationId, validUserAdmin)
  .route("/:id")
  .get(getUser)
  .patch(updateUserValidations, updateUser)
  .delete(removeUser);

userRouter
  .use("/:id/profile-image", restrictTo("admin"), validationId, validUserAdmin)
  .route("/:id/profile-image")
  .patch(upload.single("profileImgUrl"), updateProfileImage)
  .delete(deleteProfileImage);

module.exports = userRouter;

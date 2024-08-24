const catchError = require('../../utils/catchError');

const User = require('../../models/user.model');
const AppError = require('../../utils/appError');
const { UploadFile } = require('../../utils/firebase-image-cloud');

const getUsers = catchError(async (req, res) => {
  const users = await User.findAll();
  return res.json({
    status: 'success',
    message: 'users successfully brought',
    users,
  });
});

const getUser = catchError(async (req, res) => {
  const { user } = req;

  return res.json({
    status: 'success',
    message: 'user brought successfully',
    user,
  });
});

const removeUser = catchError(async (req, res) => {
  const { user } = req;
  await user.update({ status: 'inactive' });
  return res.json({
    status: 'success',
    message: 'user delete successfully',
  });
});

const updateUser = catchError(async (req, res) => {
  const { user } = req;

  const { firstName, lastName, phone } = req.body;
  await user.update({
    firstName: firstName.toLowerCase().trim(),
    lastName: lastName.toLowerCase().trim(),
    phone,
  });
  return res.json({
    status: 'success',
    message: 'user updated successfully',
    user,
  });
});

const updateProfileImage = catchError(async (req, res) => {
  const { user, file } = req;

  const imgUrl = await UploadFile.uploadToFirebase(`users/${user.id}`, file);

  if (user.profileImgUrl) UploadFile.deleteToFirebase(user.profileImgUrl);

  user.profileImgUrl = imgUrl;
  user.save();

  return res.json({
    status: 'success',
    message: 'profile photo update successfully',
  });
});

const deleteProfileImage = catchError(async (req, res, next) => {
  const { user } = req;

  if (!user.profileImgUrl)
    next(new AppError('Profile image already deleted'), 400);

  UploadFile.deleteToFirebase(user.profileImgUrl);

  user.profileImgUrl = null;
  user.save();

  return res.json({
    status: 'success',
    message: 'profile photo delete successfully',
  });
});

module.exports = {
  getUsers,
  getUser,
  removeUser,
  updateUser,
  updateProfileImage,
  deleteProfileImage,
};

const catchError = require('../../utils/catchError');
const generateJWT = require('../../utils/jwt');
const User = require('../../models/user.model');
const AppError = require('../../utils/appError');
const { encryptedPassword, verifyPassword } = require('../../utils/bcrypt');

const signUp = catchError(async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  const hashPassword = await encryptedPassword(password);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
    phone,
  });

  const token = await generateJWT(user.id);

  return res.status(201).json({
    status: 'success',
    message: 'user created successfully',
    user,
    token,
  });
});

const signIn = catchError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, status: 'active' },
  });

  if (!user) return next(new AppError('invalid credentials', 401));
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return next(new AppError('invalid credentials', 401));

  const token = await generateJWT(user.id);

  return res.json({
    status: 'success',
    user,
    token,
  });
});

const updatePassword = catchError(async (req, res) => {
  const { user } = req;
  const { newPassword } = req.body;

  const hashPassword = await encryptedPassword(newPassword);
  await user.update({
    password: hashPassword,
    passwordChangedAt: new Date(),
  });

  return res.json({
    status: 'success',
    message: 'the user password was updated success',
  });
});

module.exports = {
  signUp,
  signIn,
  updatePassword,
};

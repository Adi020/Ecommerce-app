const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchError = require("../utils/catchError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const protect = catchError(async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("you are not logged in, please log in to get access", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);
  const user = await User.findOne({
    where: { id: decoded.id, status: "active" },
  });
  if (!user)
    return next(
      new AppError("the owner of this token is not longer available", 404)
    );

  if (user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );

    if (decoded.iat < changedTimeStamp) {
      return next(
        new AppError("User recently changed password, please login again", 401)
      );
    }
  }
  req.sessionUser = user;
  next();
});

const tokenBypass = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
    }

    if (!token) return next();

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );

    const user = await User.findOne({
      where: { id: decoded.id, status: "active" },
    });

    if (!user) return next();

    if (user.passwordChangedAt) {
      const changedTimeStamp = parseInt(
        user.passwordChangedAt.getTime() / 1000,
        10
      );

      if (decoded.iat < changedTimeStamp) return next();
    }

    req.sessionUser = user;
    next();
  } catch (error) {
    next();
  }
};

const validPassword = catchError(async (req, res, next) => {
  const { sessionUser } = req;
  const { currentPassword, newPassword } = req.body;

  if (newPassword === currentPassword)
    return next(new AppError("the password cannot be equeals", 400));
  const isValid = await verifyPassword(currentPassword, sessionUser.password);
  if (!isValid) return next(new AppError("incorrect password", 401));

  req.user = sessionUser;
  next();
});

const restrictTo = (...rols) => {
  return (req, res, next) => {
    if (!rols.includes(req.sessionUser.role)) {
      return next(
        new AppError("you do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

module.exports = { protect, restrictTo, validPassword, tokenBypass };

const AppError = require('../../utils/appError');

const routeNotFound = (req, res, next) => {
  return next(
    new AppError(`can't fine ${req.originalUrl} on this server`, 404)
  );
};

module.exports = { routeNotFound };

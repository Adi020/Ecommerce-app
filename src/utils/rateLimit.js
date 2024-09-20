const rateLimit = require("express-rate-limit");

const limitRequest = (maxRequest, windowsMinutes, message) => {
  return rateLimit({
    max: maxRequest,
    windowMs: windowsMinutes,
    message,
  });
};

module.exports = limitRequest;

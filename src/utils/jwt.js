const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        resolve(token);
      }
    );
  });
};

module.exports = generateJWT;

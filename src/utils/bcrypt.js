const bcrypt = require('bcryptjs');

const encryptedPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (bodyPassword, userPassword) => {
  return await bcrypt.compare(bodyPassword, userPassword);
};

module.exports = { encryptedPassword, verifyPassword };

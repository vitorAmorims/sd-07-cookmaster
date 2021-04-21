const bcrypt = require('bcrypt-nodejs');

const cryptPass = (password) => {
  const salt = bcrypt.genSaltSync(5);
  const cryptPassword = bcrypt.hashSync(password, salt);

  return cryptPassword;
};

module.exports = {
  cryptPass,
};

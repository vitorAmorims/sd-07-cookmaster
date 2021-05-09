const statusCodes = require('./statusCodes');

const validPassword = (password) => {
  if (!password || password.length < 6) throw statusCodes.invalidData;
};

module.exports = validPassword;

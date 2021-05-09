const statusCodes = require('./statusCodes');

const validEmailFormat = (email) => {
  const REGEX = /\S+@\S+\.\S+/;
  if (!REGEX.test(email) || !email) throw statusCodes.invalidData;
  return true;
};

module.exports = validEmailFormat;

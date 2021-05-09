const statusCodes = require('./statusCodes');

const validEmailFormat = (email) => {
  const REGEX = /\S+@\S+\.\S+/;
  if (!REGEX.test(email)) throw statusCodes.invalidData;
};

module.exports = validEmailFormat;

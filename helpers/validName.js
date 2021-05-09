const statusCodes = require('./statusCodes');

const validName = (name) => {
  if (!name || name.length === 0) throw statusCodes.invalidData;
  return true;
};

module.exports = validName;

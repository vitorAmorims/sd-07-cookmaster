const statusCodes = require('./statusCodes');

const validPreparation = (preparation) => {
  if (!preparation || preparation.length === 0) throw statusCodes.invalidData;
  return true;
};

module.exports = validPreparation;

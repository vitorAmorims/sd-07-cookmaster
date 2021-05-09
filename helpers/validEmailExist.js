const { findUserByEmail } = require('../models/ModelUsers');
const status = require('./statusCodes');

const validEmailExist = async (email) => {
  const userAlreadyExistis = await findUserByEmail(email);
  if (userAlreadyExistis) throw status.conflict;
  return true;
};

module.exports = validEmailExist;

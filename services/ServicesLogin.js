const { findUserByEmail } = require('../models/ModelUsers');
const { generateToken } = require('./ServicesToken');
const { status } = require('../helpers');

const signInLogin = async (data) => {
  const { email } = data;
  const user = await findUserByEmail(email);
  if (!user) throw status.invalidData;
  delete user.password;
  const result = generateToken({ data: user });
  // delete result._id;
  return { token: result };
};

module.exports = {
  signInLogin,
};

const UserModel = require('../models/ModelUsers');
// const ServicesToken = require('./ServicesToken');

async function create(data) {
  const [result] = await UserModel.signUpUser(data);
  delete result.password;
  // const token = ServicesToken.generateToken({ data: user });
  return { user: result };
}

async function read(email) {
  const [user] = await UserModel.signUpUser(email);
  return user;
}

module.exports = {
  create,
  read,
};

const UserModel = require('../models/UserModel');

async function get(email) {
  return UserModel.getByEmail(email);
}

async function create(name, email, password) {
  const [user] = await UserModel.create(name, email, password);
  return user;
}

module.exports = {
  create,
  get,
};

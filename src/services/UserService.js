const UserModel = require('../models/UserModel');

async function create(body) {
  const { name, email, password } = body;
  const [user] = await UserModel.create(name, email, password);
  return user;
}

module.exports = {
  create,
};

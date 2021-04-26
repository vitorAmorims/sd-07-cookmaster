const UserModel = require('../models/UserModel');

async function create(name, email, password, role) {
  const user = await UserModel.create(name, email, password, role);

  return { user: { _id: user.insertedId, name, email, password, role } };
}

module.exports = {
  create,
};
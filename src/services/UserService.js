const UserModel = require('../models/UserModel');

module.exports = {
  get: async (email) => UserModel.getByEmail(email),
  create: async (name, email, password, role) => {
    const [user] = await UserModel.create(name, email, password, role);
    return user;
  },
};

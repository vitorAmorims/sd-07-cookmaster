const UserModel = require('../models/UserModel');

module.exports = {
  get: async (email) => UserModel.getByEmail(email),
  create: async (name, email, password) => {
    const [user] = await UserModel.create(name, email, password);
    return user;
  },
};

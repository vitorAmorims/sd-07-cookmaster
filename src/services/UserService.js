const userModel = require('../models/UserModel');

module.exports = {
  async create(user) {
    const emailExists = await userModel.getByEmail(user.email);
    if (emailExists) {
      return null;
    }
    if (!user.role) {
      user.role = 'user';
    }
    return await userModel.create(user);
  },
}
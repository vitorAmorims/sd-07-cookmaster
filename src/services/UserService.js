const userModel = require('../models/userModel');
const { messageSuccess, messageFailure } = require('../../helpers/messageResponse');
const httpStatus = require('../../helpers/httpStatus');

module.exports = {
  create: async (user) => {
    const userByEmailExists = await userModel.findByEmail(user.email);
    if (userByEmailExists) {
      throw messageFailure('Email already registered', httpStatus.CONFLICT);
    }
    user.role = 'user';
    const userCreated = await userModel.create(user);
    return messageSuccess(userCreated, httpStatus.CREATED);
  },
};
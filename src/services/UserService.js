const userModel = require('../models/userModel');
const { messageSuccess, messageFailure } = require('../../helpers/messageResponse');
const httpStatus = require('../../helpers/httpStatus');
const { getTokenByUser } = require('../security/Authentication');

module.exports = {
  create: async (user) => {
    const userByEmailExists = await userModel.findByEmail(user.email);
    if (userByEmailExists) {
      throw messageFailure('Email already registered', httpStatus.CONFLICT);
    }
    const { email, password, name } = user;
    const role = 'user';
    const userCreated = await userModel.create({ name, email, password, role });
    return messageSuccess(userCreated, httpStatus.CREATED);
  },
  login: async ({ email }) => {
    const { _id, role } = await userModel.findByEmail(email);
    const token = getTokenByUser({ _id, email, role });
    return messageSuccess(token, httpStatus.OK);
  },
};
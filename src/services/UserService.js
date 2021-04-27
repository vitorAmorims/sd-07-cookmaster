const userModel = require('../models/userModel');
const { messageSuccess, messageFailure } = require('../../helpers/messageResponse');
const httpStatus = require('../../helpers/httpStatus');
const { getTokenByUser } = require('../security/Authentication');

module.exports = {
  async create(user) {
    const { email, password, name } = user;
    const userByEmailExists = await userModel.findByEmail(email);
    if (userByEmailExists) {
      return messageFailure('Email already registered', httpStatus.CONFLICT);
    }
    let { role } = user;
    if (!role) {
      role = 'user';
    }
    const userCreated = await userModel.create({ name, email, password, role });
    return messageSuccess(userCreated, httpStatus.CREATED);
  },
  async login({ email }) {
    const userByEmailExists = await userModel.findByEmail(email);
    if (!userByEmailExists) {
      return messageFailure('falha no login', httpStatus.BAD_REQUEST);
    }
    const { _id, role } = userByEmailExists;
    const token = getTokenByUser({ _id, email, role });
    return messageSuccess(token, httpStatus.OK);
  },
};
const { usersModel } = require('../models');
const { mailDuplicateValidate } = require('../validations');
const { httpStatusCode } = require('../../constants');

const mailAlreadyExists = async (req, _res, next) => {
  const { email } = req.body;
  try {
    const emailAlreadyRegistred = await usersModel.findUserByEmail(email);
    mailDuplicateValidate(emailAlreadyRegistred);
  } catch (error) {
    return next({
      message: error.message,
      status: httpStatusCode.CONFLICT,
    });
  }
  next();
};

const creatAdminUser = async (req, res, next) => {
  const { role } = req.user;
  try {
    if (role !== 'admin') throw new Error('Only admins can register new admins');
    req.body.role = 'admin';
  } catch (error) {
    return next({
      message: error.message,
      status: httpStatusCode.FORBIDDEN,
    });
  }
  next();
};

module.exports = {
  creatAdminUser,
  mailAlreadyExists,
};

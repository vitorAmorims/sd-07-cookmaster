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

module.exports = {
  mailAlreadyExists,
};

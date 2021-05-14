const { usersService } = require('../service');
const { tokenGenerete } = require('../auth');

const { loginValidate } = require('../validations');
const { httpStatusCode } = require('../../constants');

const creatUser = async (req, res, next) => {
  const user = req.body;
  try {
    const createdUser = await usersService.creatUser(user);
    return res.status(httpStatusCode.CREATED).json({ user: createdUser });
  } catch (error) {
    return next({
      status: httpStatusCode.BAD_REQUEST,
      message: error.message,
    });
  }
};

const userLogin = async (req, res, next) => {
  let user = req.body;
  try {
    loginValidate(user);
    await usersService.authLogin(user);
    const { _id, name, email, role } = await usersService.findUserByEmail(user.email);
    user = {
      userId: _id, name, email, role,
    };
    const token = tokenGenerete(user);
    return res.status(httpStatusCode.OK).json({ token });
  } catch (error) {
    return next({
      message: error.message,
      status: httpStatusCode.UNAUTHORIZED,
    });
  }
};

module.exports = {
  creatUser,
  userLogin,
};

const { usersService } = require('../service');

const { httpStatusCode } = require('../../constants');

const creatUser = async (req, res, next) => {
  console.log('users: ', req.headers);
  const user = req.body;
  try {
    const createdUser = await usersService.creatUser(user);
    return res.status(httpStatusCode.CREATED).json({ user: createdUser });
  } catch (error) {
    console.log(error.message);
    return next({
      status: httpStatusCode.BAD_REQUEST,
      message: error.message,
    });
  }
};

module.exports = {
  creatUser,
};

const { usersService } = require('../service');

const { httpStatusCode } = require('../../constants');

const creatUser = async (req, res, next) => {
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

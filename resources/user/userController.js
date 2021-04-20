const { StatusCodes } = require('http-status-codes');
const { ErrorHandler } = require('../../helpers/error');

const userService = require('./userService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const createdUser = await userService.create(name, email, password);
    if (createdUser) {
      res.status(StatusCodes.CREATED).json({ user: createdUser });
    }
  } catch (error) {
    throw new ErrorHandler(
      error.message.includes('already') ? StatusCodes.CONFLICT : StatusCodes.BAD_REQUEST,
      error.message,
    );
  }
};

module.exports = {
  createUser,
};

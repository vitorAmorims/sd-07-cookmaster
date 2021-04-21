const { StatusCodes } = require('http-status-codes');
const { ErrorHandler } = require('../../helpers/error');

const cryptography = require('../../helpers/cryptography');
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

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const token = req.headers.authorization;
  const { role } = cryptography.getDataByToken(token);
  try {
    const createdAdmin = await userService.createAdmin(name, email, password, role);
    if (createdAdmin) {
      res.status(StatusCodes.CREATED).json({ user: createdAdmin });
    }
  } catch (error) {
    throw new ErrorHandler(
      error.message.includes('already') ? StatusCodes.CONFLICT : StatusCodes.FORBIDDEN,
      error.message,
    );
  }
};

module.exports = {
  createUser,
  createAdmin,
};

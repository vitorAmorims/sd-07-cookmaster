const { StatusCodes } = require('http-status-codes');
const usersService = require('./usersService');

const registerUserController = async (req, res, next) => {
  const user = req.body;
  try {
    const newUser = await usersService.registerUserService(user);
    if (!newUser) { 
      return next(
        { status: StatusCodes.CONFLICT, message: 'Email already registered' },
      ); 
    }
    return res.status(StatusCodes.CREATED).json(newUser);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const findUserController = async (req, res) => {
  const findController = await usersService.findUserService();
  return res.status(StatusCodes.OK).json(findController);
};

module.exports = {
  registerUserController,
  findUserController,
};
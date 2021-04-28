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
    console.log('registerUserController', error.message);
    throw new Error(error);
  }
};

const findUserController = async (_req, res) => {
  try {
    const findController = await usersService.findUserService();
    console.log('findController', findController);
    return res.status(StatusCodes.OK).json({ findController });
  } catch (error) {
    console.log('findUserController', error.message);
    throw new Error(error);
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || password) { 
    return next({ status: StatusCodes.UNAUTHORIZED, message: 'All fields must be filled' });
  }  
  try {
    if (!password) {
      return next({ status: StatusCodes.UNAUTHORIZED, message: 'Incorrect username or password' });
    }  
    const token = await usersService.loginUserService(email, password);
    return res.status(StatusCodes.OK).json({ message: 'Sucesso', token });
  } catch (error) {
    console.log('loginUserController', error.message);
    throw new Error(error);
  }
};

module.exports = {
  registerUserController,
  findUserController,
  loginUserController,
};
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
    return res.status(StatusCodes.OK).json({ findController });
  } catch (error) {
    console.log('findUserController', error.message);
    throw new Error(error);
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await usersService.loginUserService(email, password);
    if (!token) {
 return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Incorrect username or password' }); 
}
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
const { StatusCodes } = require('http-status-codes');
const usersService = require('./usersService');

const registerUserController = async (req, res, next) => {
  const user = req.body;
  try {
    console.log('registerUserController',user)
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
    console.log('findController', findController)
    return res.status(StatusCodes.OK).json({ findController });
  } catch (error) {
    console.log('findUserController', error.message);
    throw new Error(error);
  }
};

// const loginUserController = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const loginController = await usersService.loginUserService(email, password);
//     return res.status(StatusCodes.OK).json({ message: 'Sucesso', loginController });
//   } catch (error) {
//     console.log('loginUserController', error.message);
//     throw new Error(error);
//   }
// };

module.exports = {
  registerUserController,
  findUserController,
  // loginUserController,
};
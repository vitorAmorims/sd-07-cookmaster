const httpStatus = require('./httpStatus');
const { createUserService } = require('../service/users');

const createUserController = async (req, res) => {
  try {
    const user = req.body;
    const createUser = await createUserService(user);
    res.status(httpStatus.CREATED).json({ user: createUser });
  } catch (error) { 
    if (error.message === 'Email already registered') {
      res.status(httpStatus.CONFLICT).json({ message: error.message });
      return;
    }
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

// // const getAllUsersController = async (req, res) => {
//   const listOfUsers = await getAllUserService();
//   res.status(200).json(listOfUsers);
// };

module.exports = {
  createUserController,
  // getAllUsersController,
};
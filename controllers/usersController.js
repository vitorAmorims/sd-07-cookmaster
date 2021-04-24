const { usersService } = require('../services');
const { STATUS_CODE } = require('../helpers');

const userRegistration = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const result = await usersService.userRegistration(name, email, password);
    response.status(STATUS_CODE.CREATED).json({ user: result });
  } catch (error) {
    console.log(error);
    response.status(error.status).json({ message: error.message });
  }
};

const userLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
    const result = await usersService.userLogin(email, password);
    response.status(STATUS_CODE.SUCCESS).json({ token: result });
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  userRegistration,
  userLogin,
};
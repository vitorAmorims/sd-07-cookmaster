const { usersService } = require('../services');
const { STATUS_CODE } = require('../helpers');

const userRegistration = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const result = await usersService.userRegistration(name, email, password);
    response.status(STATUS_CODE.CREATED).json(result);
  } catch (error) {
    // console.log(error.message);
    const { status, message } = error;
    response.status(status).json(message);
  }
};

module.exports = {
  userRegistration,
};
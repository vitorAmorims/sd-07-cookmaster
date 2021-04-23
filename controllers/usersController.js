const { usersService } = require('../services');
const { STATUS_CODE } = require('../helpers');

const userRegistration = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const result = await usersService.userRegistration(name, email, password);
    response.status(STATUS_CODE.CREATED).json({ user: result });
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  userRegistration,
};
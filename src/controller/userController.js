const userModel = require('../models/userModel');
const status = require('../status');

const EMAIL_EXIST = 'Email already registered';
const createUser = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const findByEmail = await userModel.findByEmail(email);

    if (findByEmail) {
      return response.status(status.CONFLICT)
        .json({ message: EMAIL_EXIST });
    }

    const user = await userModel.createUser(name, email, password);
    response.status(status.CREATED).json({user});
  } catch (error) {
    console.error(error);
    response.status(status.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  createUser,
};
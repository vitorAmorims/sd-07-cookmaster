const JWT = require('jsonwebtoken');
const status = require('../status');
const userModel = require('../models/userModel');

const secret = 'cookmasterSecret';

const onLogin = async (request, response) => {
  try {
    const { email } = request.body;
    const user  = await userModel.findByEmail(email);

    const JWTConfig = {
      expiresIn: 60 * 60 * 2,
      algorithm: 'HS256',
    };

    const token = JWT.sign({ data:user } , secret, JWTConfig);
    response.status(status.OK).json({ token });
  } catch (error) {
    console.error(error);
    response.status(status.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = { onLogin };
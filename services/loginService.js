const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { code200, encryptSecret, encryptHeaders } = require('../utils/dictionary');

const loginUser = async (request, response) => {
  const { email } = request.body;
  const { name, password, ...userPayload } = await userModel.userByEmail(email);

  // const secret = 'qu3r0v3rde5c08r!r';

  // const headers = {
  //   expiresIn: '7d',
  //   algorithm: 'HS256',
  // };

  const token = jwt.sign(userPayload, encryptSecret, encryptHeaders);

  return response.status(code200).send({ token });
};

module.exports = {
  loginUser,
};

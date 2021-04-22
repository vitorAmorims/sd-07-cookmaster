const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const serviceLogin = require('../services/login');

const OK = 200;

const ERROR = 401;

function fnGenerateToken(emailBody, password, result, jwtConfig) {
  let token;
  const { _id, email, role } = result;
  if (emailBody === 'root@email.com' && password === 'admin') {
    token = jwt.sign({ id: _id, email, role }, authConfig.secret, jwtConfig);
  } else {
    token = jwt.sign({ id: _id, email, role }, authConfig.secret, jwtConfig);
  }
  return token;
}

const checkLogin = async (request, response) => {
  try {
    const { email: emailBody, password } = request.body;
    const result = await serviceLogin.validations(emailBody, password);

    if (result) {
      const jwtConfig = {
        expiresIn: 60 * 60,
        algorithm: 'HS256',
      };
      const token = fnGenerateToken(emailBody, password, result, jwtConfig);
      return response.status(OK).json({ token });
    }
  } catch (error) {
    console.error(error);
    const { message } = error;
    return response.status(ERROR).json({ message });
  }
};

module.exports = {
  checkLogin,
};
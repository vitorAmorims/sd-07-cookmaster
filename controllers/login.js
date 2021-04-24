const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const env = require('../config/.env');

const serviceLogin = require('../services/login');

const OK = 200;

const ERROR = 401;

function fnGenerateToken(result, jwtConfig) {
  let token;
  const { _id, email, role } = result;
  if (role === 'admin') {
    token = jwt.sign({ id: _id, email, role }, env.secret, jwtConfig);
  } else {
    token = jwt.sign({ id: _id, email, role }, env.secret, jwtConfig);
  }
  return token;
}

const checkLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
    const result = await serviceLogin.validations(email, password);
    console.log(result);
    if (result) {
      const jwtConfig = {
        expiresIn: 60 * 60,
        algorithm: 'HS256',
      };

    const isMath = bcrypt.compareSync(password, result.password);
    if (!isMath) throw new Error('password invalid!!')

      const token = fnGenerateToken(result, jwtConfig);
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
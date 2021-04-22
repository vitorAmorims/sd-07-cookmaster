const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const modelUsers = require('../models/users');

const serviceLogin = require('../services/login');

const OK = 200;
const CREATE = 201;
const UNPROCESS = 422;
const ERROR = 401;
const CONFLICT = 409;
const objError = {
  err: {
    code: 'invalid_data',
    message: ''
  }
};

const checkLogin = async (request, response) => {
  try {
    const { email, password } = request.body;

    const result = await serviceLogin.validations(email, password);
    
    if (result) {
      const jwtConfig = {
        expiresIn: 60 * 60,
        algorithm: "HS256",
      };

      let token;

      if (
        request.body.email === "root@email.com" &&
        request.body.password === "admin"
      ) {
        token = jwt.sign(
          {
            id: result._id,
            email: result.email,
            role: result.role,
          },
          authConfig.secret,
          jwtConfig
        );
      } else {
        token = jwt.sign(
          {
            id: result._id,
            email: result.email,
            role: result.role,
          },
          authConfig.secret,
          jwtConfig
        );
      }
      return response.status(OK).json({ token });
    }
  } catch (error) {
    console.error(error);

    const { message } = error;
    return response.status(ERROR).json({ message: message });
  }
};

module.exports = {
  checkLogin,
};
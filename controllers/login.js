const jwt = require('jsonwebtoken');
const { loginService } = require('../service/login');
const httpStatus = require('./httpStatus');

const secret = 'cookmasterfivestarsmichelin';

const login = async (req, res) => {
  try {
    const user = req.body;
    const loginUser = await loginService(user);
    const { _id, email, role } = loginUser;

    const jwtConfig = {
      expiresIn: 60 * 10,
      algorithm: 'HS256',
    };

    const token = jwt.sign({ _id, email, role }, secret, jwtConfig);

    res.status(httpStatus.SUCCESS).json({ token });
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      message: error.message,
    });
  }
};

module.exports = {
  login,
};
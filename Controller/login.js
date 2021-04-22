const loginService = require('../Service/login');
const { OK, UNAUTHORIZED } = require('./statusCodes');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await loginService.login(email, password);
    res.status(OK).json({ token: response });
  } catch (error) {
    res.status(UNAUTHORIZED).json(error);
  }
};

module.exports = {
  login,
};
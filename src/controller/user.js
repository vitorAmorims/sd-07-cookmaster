const {
  StatusCodes: {
    INTERNAL_SERVER_ERROR,
    CREATED,
    UNAUTHORIZED,
    OK } } = require('http-status-codes');
const userService = require('../service/users');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const response = await userService.register({ name, email, password, role: 'user' });
    const { role, _id } = response;
    return res.status(CREATED).send({
      user: { name, email, role, _id },
    });
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.login(email, password);
    if (!token || token === undefined) {
      return res.status(UNAUTHORIZED).send({
        message: 'Incorrect username or password',
      });
    }
    return res.status(OK).send({
      token: token.token,
    });
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send(error);
  }
};
module.exports = {
  register,
  login,
};
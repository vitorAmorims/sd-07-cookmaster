const { StatusCodes } = require('http-status-codes');
const { ErrorHandler } = require('../../helpers/error');

const authService = require('./authService');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    throw new ErrorHandler(
      StatusCodes.UNAUTHORIZED,
      error.message,
    );
  }
};

module.exports = {
  loginUser,
};

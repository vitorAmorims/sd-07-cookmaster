const { StatusCodes } = require('http-status-codes');
const { ServicesLogin } = require('../services');

const signIn = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await ServicesLogin.signInLogin(data);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signIn,
};

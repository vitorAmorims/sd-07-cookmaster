const CODES = require('../configurations/statusCodes');
const Services = require('../services');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const response = await Services.login(email, password);
    res.status(CODES.OK).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
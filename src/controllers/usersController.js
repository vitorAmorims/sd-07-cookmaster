const { StatusCodes } = require('http-status-codes');
const userServices = require('../services/userServices');

const createUser = async (req, res) => {
  try {
    const result = await userServices.createUser(req.body);
    res.status(StatusCodes.CREATED).json(result);
  } catch ({ message }) {
    if (message === 'Email already registered') {
      return res.status(StatusCodes.CONFLICT).send(JSON.stringify({ message }));
    }
    return res.status(StatusCodes.BAD_REQUEST).send(JSON.stringify({ message }));
  }
};

const loginHandler = async (req, res) => {
  try {
    const token = await userServices.loginHandler(req.body);
    res.status(StatusCodes.OK).send(token);
  } catch ({ message }) {
    res.status(StatusCodes.UNAUTHORIZED).send(JSON.stringify({ message }));
  }
};

module.exports = {
  createUser,
  loginHandler,
};

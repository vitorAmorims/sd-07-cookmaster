const { StatusCodes } = require('http-status-codes');
const userServices = require('../services/userServices');

const createUser = async (req, res) => {
  try {
    console.log({ body: req.body });
    const result = await userServices.createUser(req.body);
    res.status(StatusCodes.OK).json(result);
  } catch ({ message }) {
    if (message === 'Email already registred') {
      return res.status(StatusCodes.CONFLICT).send(JSON.stringify({ message }));
    }
    return res.status(StatusCodes.BAD_REQUEST).send(JSON.stringify({ message }));
  }
};

module.exports = {
  createUser,
};

const { StatusCodes } = require('http-status-codes');
const userService = require('../service/userService');

const insertNewUser = async (req, res) => {
  try {
    const result = await userService.insertNewUser(req.body);
    res.status(StatusCodes.CREATED).send(result);
  } catch ({ message }) {
    return message === 'Email already registered'
      ? res.status(StatusCodes.CONFLICT).send(JSON.stringify({ message }))
      : res.status(StatusCodes.BAD_REQUEST).send(JSON.stringify({ message }));
  }
};

module.exports = {
  insertNewUser,
};

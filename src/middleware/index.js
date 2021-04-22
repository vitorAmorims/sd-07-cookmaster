const { BAD_REQUEST_400, CONFLICT_409 } = require('../valuesGlobal');
const usersModel = require('../models/usersModel');

const checkedEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const checkedEmailExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const registered = await usersModel.getEmail(email);

    if (registered) {
      throw new Error();
    }

    next();
  } catch (error) {
    console.error(error.message);
    res.status(CONFLICT_409).send({ message: 'Email already registered' });
  }
};

const checkUserData = (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !checkedEmail(email) || !password) {
      throw new Error();
    }
    next();
  } catch (error) {
    console.error(error.message);
    res.status(BAD_REQUEST_400).send({ message: 'Invalid entries. Try again.' });
  }
};

module.exports = {
  checkUserData,
  checkedEmailExists,
};

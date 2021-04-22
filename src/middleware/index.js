const {
  BAD_REQUEST_400,
  CONFLICT_409,
  UNAUTHORIZED_401,
  checkedEmail } = require('../util');
const usersModel = require('../models/usersModel');

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

const checkLoginDataExistsMD = (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      throw new Error();
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(UNAUTHORIZED_401).send({ message: 'All fields must be filled' });
  }
};

module.exports = {
  checkUserData,
  checkedEmailExists,
  checkLoginDataExistsMD,
};

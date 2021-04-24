const jwt = require('jsonwebtoken');
const {
  BAD_REQUEST_400,
  CONFLICT_409,
  UNAUTHORIZED_401,
  checkedEmail,
  SECRET } = require('../util');
const usersModel = require('../models/usersModel');

const validaTokenMD = async (req, res, next) => {
  const { authorization: token } = req.headers;
   try {
    const decoded = jwt.verify(token, SECRET);
    const user = await usersModel.getEmail(decoded.data);
    console.log(decoded);
    if (!token) {
      throw new Error();
    }
    if (!user) {
      return res.status(UNAUTHORIZED_401).json({ message: 'Usuario inexistente' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(UNAUTHORIZED_401).send({ message: 'jwt malformed' });
  }
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

const checkLoginDataExistsMD = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error();
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(UNAUTHORIZED_401).send({ message: 'All fields must be filled' });
  }
};

const checkedRecipesDataMD = (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    if (!name || !ingredients || !preparation) {
      throw new Error();
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(BAD_REQUEST_400).send({ message: 'Invalid entries. Try again.' });
  }
};

module.exports = {
  checkUserData,
  checkedEmailExists,
  checkLoginDataExistsMD,
  validaTokenMD,
  checkedRecipesDataMD,
};

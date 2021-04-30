const validatorFormatEmail = require('email-validator');
const jwt = require('jsonwebtoken');
const usersModels = require('../models/usersModels');
const recipesModels = require('../models/recipesModels');
const messageError = require('../config/errorMessage');
const secret = require('../config/secret');

const STATUS400 = 400;
const STATUS401 = 401;
const STATUS404 = 404;
const STATUS409 = 409;
const STATUS500 = 500;

const formatEmail = (email) => validatorFormatEmail.validate(email);

const emptyFields = (name, email, password) => {
  if (!name || !email || !password) {
    return true;
  }
};

const findEmailExists = async (email) => {
  const result = await usersModels.getUserEmail(email);
  if (result) return true;
  return false;
};

// -----------------------Middlewares de validação ------------------------------

const validateUserFields = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (emptyFields(name, email, password) || !formatEmail(email)) {
      return res.status(STATUS400).json({
        message: messageError.invalidEntries,
      });
    }
    if (await findEmailExists(email)) {
      return res.status(STATUS409).json({
        message: messageError.emailExists,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

const validateLoginFields = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(STATUS401).json({
        message: messageError.loginFieldsNotExists,
      });
    }
    if (!formatEmail(email)) {
      return res.status(STATUS401).json({
        message: messageError.incorrectFields,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

const validatePass = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersModels.getUserEmail(email);
    if (!user) {
      return res.status(STATUS401).json({
        message: messageError.incorrectFields,
      });
    }
    if (password !== user.password) {
      return res.status(STATUS401).json({
        message: messageError.incorrectFields,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(STATUS401).json({ message: messageError.tokenMissing });
    }
    const decoded = jwt.verify(token, secret);
    const user = await usersModels.getUserEmail(decoded.email);
    if (!user) {
      return res.status(STATUS401).json({ message: messageError.tokenDoNotValid });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(STATUS401).json({ message: error.message });
  }
};

const validateRecipeFields = (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    if (!name || !ingredients || !preparation) {
      return res.status(STATUS400).json({ message: messageError.invalidEntries });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

const validateIdParams = async (req, res, next) => {
  try {
    const { id } = req.params;
    const searchId = await recipesModels.getRecipeById(id);
    if (!searchId) {
      return res.status(STATUS404).json({ message: messageError.IdInvalid });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(STATUS404).json({ message: messageError.IdInvalid });
  }
};

module.exports = {
  validateUserFields,
  validateLoginFields,
  validatePass,
  validateToken,
  validateRecipeFields,
  validateIdParams,
};

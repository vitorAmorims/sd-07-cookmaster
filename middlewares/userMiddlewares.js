const connection = require('../config/connection');

const BADREQUEST = 400;
const CONFLICT = 409;
const INVALIDENTRIES = 'Invalid entries. Try again.';
const EMAILREGISTERED = 'Email already registered';

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(BADREQUEST).send({
      message: INVALIDENTRIES });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  const checkEmailExist = await connection()
.then((db) => db.collection('users').findOne({ email }));
  if (!email) {
    return res.status(BADREQUEST).send({
      message: INVALIDENTRIES });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).send({
      message: INVALIDENTRIES });
  }
    if (checkEmailExist) {
      return res.status(CONFLICT).send({
        message: EMAILREGISTERED });
    }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(BADREQUEST).send({
      message: INVALIDENTRIES });
  }
  next();
};

module.exports = {
  validateName, validateEmail, validatePassword,
};
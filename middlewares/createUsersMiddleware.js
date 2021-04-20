const usersModel = require('../model/usersModel');

const unprocessableEntity = 400;
const reg = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
const conflitct = 409;
const validEmail = (email) => email.match(reg);

const nameEmailIspresent = (name, email) => {
  if (!name || !email) return true;  
};

const createUsersMiddleware = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (nameEmailIspresent(name, email) || !validEmail(email) || !password) {
    return res.status(unprocessableEntity).send({
      message: 'Invalid entries. Try again.',
    });
  }
  if (await usersModel.findEmail(email)) {
    return res.status(conflitct).send({
      message: 'Email already registered',
    });
  }
  next();
};

module.exports = createUsersMiddleware;

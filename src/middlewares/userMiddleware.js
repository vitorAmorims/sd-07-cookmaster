const { usersModel } = require('../models');
const { readByEmail, readByPassword } = usersModel;
const { UNAUTHORIZED } = require('../status');

const validateEmailOrPasswordIsValid = async (req, _res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new Error('All fields must be filled');

    const userByEmail = await readByEmail(email);
    const userByPassword = await readByPassword(password);
    if (!userByEmail || !userByPassword)
      throw new Error('Incorrect username or password');

    // console.log(userByEmail);
    // req.role = userByEmail.role;
    next();
  } catch (error) {
    console.error(error);
    next({
      status: UNAUTHORIZED,
      message: error.message,
    });
  }
};

module.exports = {
  validateEmailOrPasswordIsValid,
};

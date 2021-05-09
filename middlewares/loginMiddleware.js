const { validUserLogin, validPassword } = require('../helpers');
const { status } = require('../helpers');

const dataUserLoginCheck = async (req, res, next) => {
  const { body } = req;
  const { email, password } = body;
  try {
    validPassword(password);
    if (!email) throw status.userAlredyExists;
    await validUserLogin(body);
    next();
  } catch (error) {
    return res.status(error.code).json(error.message);
  }
};

module.exports = dataUserLoginCheck;

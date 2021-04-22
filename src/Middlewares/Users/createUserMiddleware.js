const CODE_ERROR = 400;
const OBJECT_RESPONSE = { message: 'Invalid entries. Try again.' };
const EMAIL_REGEX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
const MIN_SIZE = 5;

const { getUserByEmailService } = require('../../Services/userService');

const isName = (name) => {
  if (!name || typeof name !== 'string') {
    return true;
  }
};

const isEmail = async (email) => {
  if (!EMAIL_REGEX.test(email)) {
    return true;
  }
  const result = await getUserByEmailService(email);
  console.log(`Result in middleware: ${result}`);
  if (result === email) {
    return true;
  }
};

const isPass = (password) => {
  if (password.lenght <= MIN_SIZE) {
    return true;
  }
};

const middlewareCreateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (isName(name) || isEmail(email) || isPass(password)) {
      res.status(CODE_ERROR).json(OBJECT_RESPONSE);
    }
  } catch (error) {
    console.log(`Error in data validation user: ${error}`);
  }
  next();
};

module.exports = {
  middlewareCreateUser,
};

const CODE_ERROR = 400;
const ERRO_CODE = 409;
const OBJECT_RESPONSE = { message: 'Invalid entries. Try again.' };
const EMAIL_REGEX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
const MIN_SIZE = 5;

const { getUserByEmailService } = require('../../Services/userService');

const isName = (name) => {
  if (!name || typeof name !== 'string') {
    return true;
  }
  return false;
};

const isValid = async (email) => {
  const result = await getUserByEmailService(email);
  console.log(`Result in middleware: ${await result}`);
  if (result === email) {
    return true;
  }
};

const isEmail = async (email) => {
  if (!EMAIL_REGEX.test(email)) {
    return true;
  }
  isValid(email);  
};

const isPass = (password) => {
  if (password.lenght <= MIN_SIZE) {
    return true;
  }
  return false;
};

const middlewareCreateUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (isEmail(email)) res.status(CODE_ERROR).json(OBJECT_RESPONSE); 
    if (isName(name)) res.status(CODE_ERROR).json(OBJECT_RESPONSE);
    if (isPass(password)) res.status(CODE_ERROR).json(OBJECT_RESPONSE);
  } catch (error) {
    console.log(`Error in data validation user: ${error}`);
  }

  next();
};

module.exports = {
  middlewareCreateUser,
};

const CODE_ERROR = 400;
const ERRO_CODE = 409;
const EMAIL_EXIST = 'Email already registered';
const OBJECT_RESPONSE = 'Invalid entries. Try again.';
const EMAIL_REGEX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;

const { getUserByEmailService } = require('../../Services/userService');

const isName = (name) => {
  if (name === undefined) {
    console.log('entrou aqui!');
    return true;
  }
};

const isEmail = async (email) => {
  const result = await getUserByEmailService(email);
  if (!EMAIL_REGEX.test(email)) {
    return { code: CODE_ERROR, message: OBJECT_RESPONSE };
  }
  if (email === undefined || email === null) {
    return { code: CODE_ERROR, message: OBJECT_RESPONSE };
  }
  if (result === email) {
    return { code: ERRO_CODE, message: EMAIL_EXIST };
  }
};

const isPass = (password) => {
  if (password === undefined) {
    return true;
  }
};

const middlewareCreateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    console.log(`Return is email: ${(await isEmail(email)) !== undefined}`);
    if (isName(name) === true) return res.status(CODE_ERROR).json({ message: OBJECT_RESPONSE });
    if (isPass(password) !== undefined) {
      return res.status(CODE_ERROR)
    .json({ message: OBJECT_RESPONSE }); 
    }
    if ((await isEmail(email)) !== undefined) {
      const result = await isEmail(email);
      return res.status(result.code).json({ message: result.message });
    }
  } catch (error) {
    console.log(`Error in data validation user: ${error}`);
  }

  next();
};

module.exports = {
  middlewareCreateUser,
};

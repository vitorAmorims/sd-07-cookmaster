const inputsValidator = require('../validation/inputsValidator');
const { getUserByEmail, insertUser } = require('../../model/userModel');
const { BAD_INPUT, EMAIL_TAKEN } = require('../servDictionary');

const validation = async (inputInfo) => {
  const MANDATORY_FIELDS = ['name', 'email', 'password'];
  const correctEntries = MANDATORY_FIELDS
    .find((field) => !Object.keys(inputInfo).includes(field));
  const allStrings = Object.values(inputInfo)
    .find((value) => typeof value !== 'string');
  
  if (allStrings === 0 || correctEntries) {
    return { status: BAD_INPUT };
  }
  const inputs = inputsValidator(inputInfo);
  if (inputs.status !== 'valid') {
    return inputs;
  }
  const emailInDb = await getUserByEmail(inputInfo.email);
  return emailInDb
    ? { status: EMAIL_TAKEN }
    : false;
};

const insertUserServ = async (body) => {
  const inputsInvalid = await validation(body);
  if (inputsInvalid) {
    return inputsInvalid;
  }
  const userData = body.role ? { ...body } : { ...body, role: 'user' };
  const [userInsRes] = await insertUser(userData);
  return { user: userInsRes, status: 'Created' };
  };

module.exports = insertUserServ;
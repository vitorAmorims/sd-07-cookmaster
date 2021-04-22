const { emailInDb, preCheckFields } = require('../validation/inputsValidator');
const { insertUser } = require('../../model/userModel');
const { USER_NOT_FOUND, MISSING_FIELDS } = require('../servDictionary');

const loginServ = async (body) => {
  const inputsInvalid = preCheckFields({ ...body, name: 'john' });
  if (inputsInvalid) {
    return { status: MISSING_FIELDS };
  }
  const userExists = await emailInDb(body.email);
  if (!userExists) {
    return { status: USER_NOT_FOUND };
  }
  const userData = body.role ? { ...body } : { ...body, role: 'user' };
  const [userInsRes] = await insertUser(userData);
  return { user: userInsRes, status: 'OK' };
  };

module.exports = loginServ;
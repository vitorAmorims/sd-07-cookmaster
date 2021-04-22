const validator = require('validator');
const { emailInDb, inputsValidator } = require('../validation/inputsValidator');
const { insertUser } = require('../../model/userModel');
const { EMAIL_TAKEN, BAD_INPUT } = require('../servDictionary');

const insertUserServ = async (body) => {
  const inputsInvalid = inputsValidator(body);
  if (inputsInvalid) {
    return inputsInvalid;
  }
  const validName = validator.isAlpha(body.name.replace(/ /g, ''));
  if (!validName) {
    return { status: BAD_INPUT };
  }
  const emailTaken = await emailInDb(body.email);
  if (emailTaken) {
    return { status: EMAIL_TAKEN };
  }
  const userData = body.role ? { ...body } : { ...body, role: 'user' };
  const [userInsRes] = await insertUser(userData);

  return { user: userInsRes, status: 'Created' };
  };

module.exports = insertUserServ;
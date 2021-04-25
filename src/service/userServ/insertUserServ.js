// const bcrypt = require('bcrypt');
const { emailInDb, inputsValidator } = require('../validation/inputsValidator');
const { insertUser } = require('../../model/userModel');
const { EMAIL_TAKEN } = require('../servDictionary');

const insertUserServ = async (body) => {
  // const saltRounds = 10;
  const mandatoryFields = ['name', 'email', 'password'];
  const inputsInvalid = inputsValidator(body, mandatoryFields);
  if (inputsInvalid) {
    return inputsInvalid;
  }
  const emailTaken = await emailInDb(body.email);
  if (emailTaken) {
    return { status: EMAIL_TAKEN };
  }
  const { email, name, password } = body;
  // const passHashed = bcrypt.hashSync(password, saltRounds);
  const userData = { email, name, role: body.role || 'user', password }; // : passHashed };
  const [userInsRes] = await insertUser(userData);
  const safeToReturn = { ...userInsRes, password };
  return { user: safeToReturn, status: 'Created' };
  };

module.exports = insertUserServ;
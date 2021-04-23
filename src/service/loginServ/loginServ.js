const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const { preCheckFields } = require('../validation/inputsValidator');
const { getUserByEmail } = require('../../model/userModel');
const { JWT_CONFIG, MISSING_FIELDS, USER_NOT_FOUND, WRONG_PASSWORD } = require('../servDictionary');

const loginServ = async (body) => {
  const inputsInvalid = preCheckFields({ ...body, name: 'john' });
  if (inputsInvalid) {
    return { status: MISSING_FIELDS };
  }
  const userData = await getUserByEmail(body.email);
  if (!userData) {
    return { status: USER_NOT_FOUND };
  }
  const hash = userData.password;
  if (!bcrypt.compareSync(body.password, hash)) {
    console.log('could not validate pass', !bcrypt.compareSync(body.password, hash));
    return { status: WRONG_PASSWORD };
  }
  const { _id, name, role } = userData;
  const payload = { _id, name, role };
  const token = jwt.sign({ data: payload }, process.env.SECRET, JWT_CONFIG);
  return { token, status: 'OK' };
  };

module.exports = loginServ;
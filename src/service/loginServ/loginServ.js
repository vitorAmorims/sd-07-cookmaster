require('dotenv').config();
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { preCheckFields } = require('../validation/inputsValidator');
const { getUserByEmail } = require('../../model/userModel');
const { JWT_CONFIG, MISSING_FIELDS, USER_NOT_FOUND, WRONG_PASSWORD } = require('../servDictionary');

const loginServ = async (body) => {
  const mandatoryFields = ['name', 'email', 'password'];
  const inputsInvalid = preCheckFields({ ...body, name: 'john' }, mandatoryFields);
  if (inputsInvalid) {
    return { status: MISSING_FIELDS };
  }
  const userData = await getUserByEmail(body.email);
  if (!userData) {
    return { status: USER_NOT_FOUND };
  }
  // if (!bcrypt.compareSync(body.password, userData.password)) {
  if (body.password !== userData.password) {
    return { status: WRONG_PASSWORD };
  }
  const { _id, name, role } = userData;
  const payload = { id: _id, name, role };
  const token = jwt.sign({ data: payload }, process.env.SECRET || '12345', JWT_CONFIG);
  return { token, status: 'OK' };
  };

module.exports = loginServ;
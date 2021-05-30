// Lógica colaborada e consultada com o colega Arthur Massaini PR: https://github.com/tryber/sd-07-cookmaster/blob/abc067adbe137ae988bfd481ce3b9a3bc32853e2/src/services/loginService.js
const jwt = require('jsonwebtoken');

const modelUsers = require('../models/modelUsers');

const FILLED_FIELDS_MESSAGE = 'All fields must be filled';
const INCORRECT_DATA_MESSAGE = 'Incorrect username or password';

const entriesVerification = (email, password, allUsers) => {
  const userEmailValid = allUsers.some((element) => element.email === email);
  const userPasswordValid = allUsers.some(
    (element) => element.password === password,
  );

  if (email === undefined || password === undefined) {
    throw new Error(FILLED_FIELDS_MESSAGE);
  } else if (!userEmailValid || !userPasswordValid) {
    throw new Error(INCORRECT_DATA_MESSAGE);
  }
};

const secret = 'abc';

const userLogin = async (email, password) => {
  const allUsers = await modelUsers.getAllUsers();
  const user = await modelUsers.getUserByEmail(email);

  try {
    entriesVerification(email, password, allUsers);

    const jwtConfig = {
      expiresIn: 60 * 5,
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: user }, secret, jwtConfig);
    return token;
  } catch (error) {
    return error.message;
  }
};

module.exports = { userLogin };

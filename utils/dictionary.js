// const status = {
//   code200: 200,
//   code201: 201,
// };

const code200 = 200;
const code201 = 201;
const code400 = 400;
const code401 = 401;
const code409 = 409;

const message = {
  tryAgain: 'Invalid entries. Try again.',
  emailRegistered: 'Email already registered',
  mustBeFilled: 'All fields must be filled',
  incorrectInfo: 'Incorrect username or password',
};

module.exports = {
  code200,
  code201,
  code400,
  code401,
  code409,
  message,
};

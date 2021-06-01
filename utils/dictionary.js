const code200 = 200;
const code201 = 201;
const code204 = 204;
const code400 = 400;
const code401 = 401;
const code409 = 409;

const message = {
  tryAgain: 'Invalid entries. Try again.',
  emailRegistered: 'Email already registered',
  mustBeFilled: 'All fields must be filled',
  incorrectInfo: 'Incorrect username or password',
  tokenError: 'jwt malformed',
};

const encryptSecret = 'qu3r0v3rde5c08r!r';

const encryptHeaders = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = {
  code200,
  code201,
  code204,
  code400,
  code401,
  code409,
  message,
  encryptSecret,
  encryptHeaders,
};

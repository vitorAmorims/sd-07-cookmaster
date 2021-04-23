//
const key = 'shhhhh';

const header = {
  algorithm: 'HS256',
  expiresIn: 60 * 60 * 4,
};

module.exports = {
  key,
  header,
};
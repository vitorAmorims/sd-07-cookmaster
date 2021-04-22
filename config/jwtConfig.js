const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const secret = 'thadeu';

module.exports = {
  jwtConfig,
  secret,
};
const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const secret = 'mauro';

module.exports = {
  jwtConfig,
  secret,
};

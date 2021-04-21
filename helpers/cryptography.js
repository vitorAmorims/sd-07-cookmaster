const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const SECRET = 'NossaSenhoraDoTranspilador';

const SALT_TIMES = 5;

const encryptText = (plainText) => {
  const salt = bcrypt.genSaltSync(SALT_TIMES);
  return bcrypt.hashSync(plainText, salt);
};

const cryptCompare = (plainText, encryptedText) => bcrypt.compareSync(plainText, encryptedText);

const generateUserToken = (email) => {
  const jwtConfig = {
    expiresIn: 60 * 5,
    algorithm: 'HS256',
  };

  return jwt.sign({ data: email }, SECRET, jwtConfig);
};

module.exports = {
  encryptText,
  cryptCompare,
  generateUserToken,
};
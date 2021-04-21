const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const SECRET = 'NossaSenhoraDoTranspilador';

const SALT_TIMES = 5;

const encryptText = (plainText) => {
  const salt = bcrypt.genSaltSync(SALT_TIMES);
  return bcrypt.hashSync(plainText, salt);
};

const cryptCompare = (plainText, encryptedText) => bcrypt.compareSync(plainText, encryptedText);

const generateUserToken = (email, id) => {
  const jwtConfig = {
    expiresIn: 60 * 5,
    algorithm: 'HS256',
  };

  return jwt.sign({ data: { email, id } }, SECRET, jwtConfig);
};

const getDataByToken = (token) => {
  const decoded = jwt.verify(token, SECRET);
  return decoded.data;
};

module.exports = {
  encryptText,
  cryptCompare,
  generateUserToken,
  getDataByToken,
};
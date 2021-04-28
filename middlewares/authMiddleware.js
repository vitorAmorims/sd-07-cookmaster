require('dotenv');
const jwt = require('jsonwebtoken');
const { getUserById } = require('../src/model/userModel');
const { statusMsgMap } = require('../src/controller/dictionaries');
const { validMongoId } = require('../src/service/validation');

const { status, message } = statusMsgMap['missing token'];

const AUTH_ERR = 'missing auth token';

const userValidation = async (id) => {
  if (!validMongoId(id)) {
    return false;
  }
  const userInDb = await getUserById(id);
  if (!userInDb) {
    return false;
  }
  return true;
};

const tokenValidation = (tkn) => {
  try {
    const jwtDecoded = jwt.verify(tkn, process.env.SECRET || '12345');
    return jwtDecoded;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(status).json({ message: 'missing auth token' });
    const decodedToken = tokenValidation(token);
    if (!decodedToken) return res.status(status).json({ message });
    const { id } = decodedToken.data;
    const userExists = await userValidation(id);
    return !userExists
      ? res.status(status).json(message)
      : next();
  } catch (err) {
    console.log(err, 'error');
    return res.status(statusMsgMap['permition denied'].status).json({ message: AUTH_ERR });
  }
};

require('dotenv');
const jwt = require('jsonwebtoken');
const { getUserById } = require('../src/model/userModel');
const { statusMsgMap } = require('../src/controller/dictionaries');
const { validMongoId } = require('../src/service/validation');

const { status, message } = statusMsgMap['missing token'];

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
  if (!tkn) return { err: 'missing auth token' };
  const jwtDecoded = jwt.verify(tkn, process.env.SECRET);
  if (!jwtDecoded) {
    console.log('No token', tkn, jwtDecoded);
    return { err: 'missing token', status: 'missing auth token' };
  }
  return jwtDecoded;
};

module.exports = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = tokenValidation(token);
    if (decodedToken.err) return next({ err: decodedToken.err });
    const { id } = decodedToken.data;
    const userExists = await userValidation(id);
    return !userExists
      ? next({ err: 'Invalid token', status, message })
      : next();
  } catch (err) {
    console.log(err, 'error');
    return next({ err: 'authMiddleware error', status, message });
  }
};

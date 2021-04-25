require('dotenv');
const jwt = require('jsonwebtoken');
const { getUserById } = require('../src/model/userModel');
const { statusMsgMap } = require('../src/controller/dictionaries');
const { validMongoId } = require('../src/service/validation');

const { status, message } = statusMsgMap['missing token'];

const userValidation = async (id) => {
  const userInDb = await getUserById(id); 
  if (!validMongoId(id) || !userInDb) {
  return false;
  }
  return true;
};

module.exports = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    const jwtDecoded = jwt.verify(token, process.env.SECRET);
    if (!token || !jwtDecoded) {
      console.log('No token', req.headers);
      return next({ err: 'missing token', status, message });
    }
    const { id } = jwtDecoded.data;
    const userExists = await userValidation(id);
    return !userExists
      ? next({ err: 'Invalid token', status, message })
      : next();
  } catch (err) {
    console.log(err, 'error');
    return next({ err: 'authMiddleware error', status, message });
  }
};

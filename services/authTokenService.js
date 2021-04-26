const jwt = require('jsonwebtoken');
const Users = require('../models/usersModels');

const secret = '123';

const generateAuthToken = (id, email, role = 'user') => {
  const jwtConfig = {
    expiresIn: 60*5,
    algorithm: "HS256"
  }
  const token = jwt.sign({ id, email, role }, secret, jwtConfig);
  return token;
}

const tokenIsValid = async (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    if (decoded) {
      const user = await Users.findUser(decoded.email);
      if(user) {
        req.user = user;
        return true;
      }
    }
    console.log("cheguei aqui");
  } catch (error) {
    return false;
  }
};

module.exports = { generateAuthToken, tokenIsValid };
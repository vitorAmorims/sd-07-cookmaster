const jwt = require('jsonwebtoken');

const Models = require('../models');

const { SECRET } = process.env;

const generateToken = (dataObject) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  return jwt.sign(dataObject, SECRET, jwtConfig);
};

const validateToken = async (token) => {
  if (!token) throw new Error();
  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await Models.getByEmailAndPassword(decoded.email, decoded.password);

    if (!user) throw new Error();
    return user;
  } catch (err) {
    throw new Error();
  }
};

module.exports = {
  generateToken,
  validateToken,
};

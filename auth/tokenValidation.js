const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');

const secret = 'serounaosereisaquestao';

const AUTHORIZATION = 'authorization';

const tokenValidation = async (req, res, next) => {
  const token = req.headers[AUTHORIZATION];
  if (!token) return res.status(401).send({ message: 'missing auth token' });

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UsersModel.findByEmail(decoded.data);
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).send({ message: 'jwt malformed' });
  }
};

module.exports = tokenValidation;

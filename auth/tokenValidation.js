const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');

const secret = 'serounaosereisaquestao';

const AUTHORIZATION = 'authorization';

const tokenValidation = async (req, res, next) => {
  const token = req.headers[AUTHORIZATION];
  try {
    if (!token) {
      return res.status(401)
        .send({ message: 'missing auth token' });
    }
    const decoded = jwt.verify(token, secret);

    const user = await UsersModel.findByEmail(decoded.data);
    
    if (!user) return res.status(401).send({ message: 'missing auth token' });

    req.user = user;
    
    next();
  } catch (error) {
    return res.status(401).send({ message: 'jwt malformed' });
  }
};

module.exports = tokenValidation;

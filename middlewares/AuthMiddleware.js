const jwt = require('jsonwebtoken');
const user = require('../models/Users');
const secret = require('../utils/env');

const errorMsg = 'jwt malformed';

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const { email } = jwt.verify(authorization, secret);    
    const validUser = await user.getByEmail(email);

    if (!validUser) {
      return res.status(401).json({ message: errorMsg });
    }

    next();
  } catch (error) {    
    return res.status(401).json({ message: errorMsg });
  }
};

module.exports = auth;
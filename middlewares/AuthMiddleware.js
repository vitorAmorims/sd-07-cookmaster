const jwt = require('jsonwebtoken');
const user = require('../models/Users');
const secret = require('../utils/env');

const errorMsg = 'jwt malformed';

const allUser = async (req, res, next) => {
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

const onlyAdmin = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const { role } = jwt.verify(authorization, secret);

    if (role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can register new admins' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: errorMsg });
  }
};

module.exports = {
  allUser,
  onlyAdmin,
};
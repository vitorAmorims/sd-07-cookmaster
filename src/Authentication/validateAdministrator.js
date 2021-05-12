const jwt = require('jsonwebtoken');
const { secret } = require('../Controllers/loginController');
const { findOneUser } = require('../Models/usersModel');

const FORBIDEN = 403;
const INTSERVERERROS = 500;

const validateAdministrator = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const decoded = jwt.verify(token, secret);
    const user = await findOneUser(decoded.data.email);

    if (user.role !== 'admin') {
      return res.status(FORBIDEN).json({ message: 'Only admins can register new admins' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(INTSERVERERROS).json({ message: 'erro interno' });
  }
};

module.exports = { validateAdministrator };

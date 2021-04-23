const rescue = require('express-rescue');

const ForbiddenError = require('../errors/ForbiddenError');

const checkAdminStatus = rescue(async (req, _res, next) => {
  if (req.user.role !== 'admin') {
    throw new ForbiddenError();
  }
  next();
});

module.exports = checkAdminStatus;
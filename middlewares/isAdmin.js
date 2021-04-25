const { FORBIDDEN } = require('../utils/statusCode.json');

const isAdmin = async (req, res, next) => {
  const { role } = req.user;
  req.body.role = 'admin';
  if (role !== 'admin') {
    const err = new Error();
    err.message = 'Only admins can register new admins';
    res.status(FORBIDDEN).json(err);
    return next(err);
  }
  next();
};

module.exports = isAdmin;

const userModel = require('../models/userModel');

const validateAdmin = async (req, _res, next) => {
  const admins = await userModel.getIdAdmin();

  const isAdmin = admins.some(({ _id }) => _id.toString() === req.userId);

  if (!isAdmin) return next({ status: 403, message: 'Only admins can register new admins' });

  next();
};

module.exports = validateAdmin;

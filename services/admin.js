const admin = require('../models/admin');

const verifyAdminUser = async (role) => {
  if (role !== 'admin') {
    const error = { code: 403, message: 'Only admins can register new admins' };
    throw error;
  }
};

const addAdminService = async (name, email, password) => {
  const newAdmin = await admin.addAdminModel(name, email, password);
  return newAdmin;
};

module.exports = { verifyAdminUser, addAdminService };
const {
  validEmailFormat, validEmailExist, validName, validPassword, status } = require('../helpers');

const dataUserInsertCheck = async (req, res, next) => {
  const { body: { name, email, password, role } } = req;
  try {
    if (!role || role !== 'admin') req.body.role = 'user';
    validEmailFormat(email);
    validName(name);
    validPassword(password);
    await validEmailExist(email);
    next();
  } catch (error) {
    return res.status(error.code).json(error.message);
  }
};

const dataAdminInsertCheck = async (req, res, next) => {
  const { body: { role } } = req;
  const isAdmin = req.user.data.role;
  try {
    if (isAdmin !== 'admin') throw status.notUserAdmin;
    if (!role || role !== 'admin') req.body.role = 'admin';
    next();
  } catch (error) {
    return res.status(error.code).json(error.message);
  }
};

module.exports = { dataUserInsertCheck, dataAdminInsertCheck };

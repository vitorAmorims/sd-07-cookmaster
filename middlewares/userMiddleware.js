const { validEmailFormat, validEmailExist, validName, validPassword } = require('../helpers');

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

module.exports = dataUserInsertCheck;

const status = require('../config/statusTable');
const usersServices = require('../services/usersServices');

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = 'user';
    const newUser = await usersServices.addUserValidation(name, email, password, role);
    if (newUser.message) {
      return res.status(newUser.code).json({ message: newUser.message });
    }

    res.status(status.created).json({ user: newUser });
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await usersServices.newToken(email, password);
    if (token.message) {
      return res.status(token.code).json({ message: token.message });
    }
    res.status(status.ok).json({ token }); 
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { role } = req.data;
    const { name, email, password } = req.body;
    const userAdmin = await usersServices.addAdminValidation(name, email, password, role);
    if (userAdmin.message) {
      return res.status(userAdmin.code).json({ message: userAdmin.message });
    }
    res.status(status.created).json({ user: userAdmin });
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

module.exports = {
  addUser,
  userLogin,
  addAdmin,
};

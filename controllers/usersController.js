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

module.exports = {
  addUser,
};

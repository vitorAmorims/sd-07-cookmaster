const user = require('../services/users');
const admin = require('../services/admin');
const { code } = require('../helpers/messages');

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await user.addUserService(name, email, password);
    return res.status(code[21]).json({ user: newUser });
  } catch (error) {
    return res.status(error.code || code[50]).json({ message: error.message });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { role } = req.user;
    await admin.verifyAdminUser(role);

    const { name, email, password } = req.body;
    const newAdmin = await admin.addAdminService(name, email, password);
    return res.status(code[21]).json({ user: newAdmin });
  } catch (error) {
    return res.status(error.code || code[50]).json({ message: error.message });
  }
};

module.exports = { addUser, addAdmin };
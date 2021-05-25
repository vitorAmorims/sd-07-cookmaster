const { addUserService } = require('../services/users');
const { code } = require('../helpers/messages');

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await addUserService(name, email, password);
    res.status(code[21]).json(newUser);
  } catch (error) {
    res.status(code[50]).json({ message: error.message });
  }
};

module.exports = { addUser };
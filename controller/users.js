const { addUserService } = require('../services/users');
const { code } = require('../helpers/messages');

const addUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const newUser = await addUserService(name, email, password);
    console.log('newUser', newUser);
    return res.status(code[21]).json(newUser);
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

module.exports = { addUser };
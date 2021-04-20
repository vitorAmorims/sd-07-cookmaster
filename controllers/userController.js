const UserService = require('../services/userService');

const addUser = async (req, resp) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserService.addUser(name, email, password);
    return resp.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    resp.status(500).json({ message: error.message });
  }
};

module.exports = {
  addUser,
};
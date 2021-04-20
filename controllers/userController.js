const userService = require('../services/userService');

const addUsers = async (req, res) => {
  const { name, email, password } = req.body;

  const { code, message, user } = await userService.add(name, email, password);
  
  if (!user) return res.status(code).json({ message });
  
  res.status(code).json({ 
    user: { name: user.name, email: user.email, role: 'user', _id: user.id,
  } });
};

const getAllUsers = async (_req, res) => {
  const { code, user } = await userService.getAll();
  // console.log(user)
  return res.status(code).json({ user });
};

module.exports = {
  getAllUsers,
  addUsers,
};
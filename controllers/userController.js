const userService = require('../services/userService');

const addUsers = async (req, res) => {
  const { name, email, password, role } = req.body;

  const { code, message, user } = await userService.add(name, email, password, role);
  
  if (!user) return res.status(code).json({ message });
  
  res.status(code).json({ 
    user: { name: user.name, email: user.email, role: user.role, _id: user.id,
  } });
};

const getAllUsers = async (_req, res) => {
  const { code, user } = await userService.getAll();
  
  return res.status(code).json({ user });
};

module.exports = {
  getAllUsers,
  addUsers,
};
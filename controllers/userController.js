const userService = require('../services/userService');

const addUsers = async (req, res) => {
  const { name, email, password } = req.body;

  const { code, message, user } = await userService.add(name, email, password);
  
  if (!user) return res.status(code).json({ message });
  
  res.status(code).json({ 
    user: { name: user.name, email: user.email, role: user.role, _id: user.id,
  } });
};

const getAllUsers = async (_req, res) => {
  const { code, user } = await userService.getAll();
  
  return res.status(code).json({ user });
};

const addAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const { code, message, admin } = await userService.add(name, email, password);
  
  if (!admin) return res.status(code).json({ message });
  
  res.status(code).json({ 
    user: { name: admin.name, email: admin.email, role: admin.role, _id: admin.id,
  } });
};

module.exports = {
  getAllUsers,
  addUsers,
  addAdmin,
};
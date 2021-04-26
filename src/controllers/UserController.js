const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');

const SECRET_PASS = 'marcelodossantos';

const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = 'user';
    
    const user = await UserService.create(name, email, password, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ Error: error.message });      
  }
};

const createAdmin = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { role } = jwt.verify(authorization, SECRET_PASS);
    const { name, email, password } = req.body;
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can register new admins' });
    }
    
    const user = await UserService.create(name, email, password, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ Error: error.message });      
  }
};

module.exports = {
  create,
  createAdmin,
};

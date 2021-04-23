const userModel = require('../models/userModel');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = 'user';

    const user = await userModel.createUser(name, email, password, role);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Erro de servidor' });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = 'admin';

    const user = await userModel.createUser(name, email, password, role);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Erro de servidor' });
  }
};

module.exports = {
  createUser,
  createAdmin,
};

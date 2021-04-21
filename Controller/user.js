const { restart } = require('nodemon');
const user = require('../Service/user');

const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await user.create(name, email, password);
    res.status(201).json({ user: result });
  } catch (error) {
    if (error.message.includes('Email')) return res.status(409).json(error);
    res.status(400).json(error);
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { role } = req.user;
    const result = await user.createAdmin(name, email, password, role);
    res.status(201).json({ user: result });
  } catch (error) {
    res.status(403).json(error);
  }
};

module.exports = {
  create,
  createAdmin,
};
const user = require('../Service/user');
const { CREATED, CONFLICT, BAD_REQUEST, FORBIDDEN } = require('./statusCodes');

const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await user.create(name, email, password);
    res.status(CREATED).json({ user: result });
  } catch (error) {
    if (error.message.includes('Email')) return res.status(CONFLICT).json(error);
    res.status(BAD_REQUEST).json(error);
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { role } = req.user;
    const result = await user.createAdmin(name, email, password, role);
    res.status(CREATED).json({ user: result });
  } catch (error) {
    res.status(FORBIDDEN).json(error);
  }
};

module.exports = {
  create,
  createAdmin,
};
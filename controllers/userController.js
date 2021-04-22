const userService = require('../services/userService');
const code = require('../utils/code');
const msg = require('../utils/msg');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = 'user';
    const result = await userService.createUser(name, email, password, role);
    return res.status(result.status).json(result.msg);
  } catch (err) {
    console.error(err);
    return res.status(code.SERVER).json(msg.defaultErr);
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = 'admin';
    const ownRole = req.user.role;
    const params = { name, email, password, role, ownRole };
    const result = await userService.createAdmin(params);
    return res.status(result.status).json(result.msg);
  } catch (err) {
    console.error(err);
    return res.status(code.SERVER).json(msg.defaultErr);
  }
};

module.exports = {
  createUser,
  createAdmin,
};

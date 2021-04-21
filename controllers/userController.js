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

module.exports = {
  createUser,
};

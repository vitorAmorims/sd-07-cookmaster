const loginService = require('../services/loginService');
const code = require('../utils/code');
const msg = require('../utils/msg');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginService.login(email, password);
    return res.status(result.status).json(result.msg);
  } catch (err) {
    console.error(err);
    return res.status(code.SERVER).json(msg.defaultErr);
  }
};

module.exports = {
  login,
};

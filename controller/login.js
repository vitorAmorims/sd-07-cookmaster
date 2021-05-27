const log = require('../services/users');
const { code } = require('../helpers/messages');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    log.loginIsRequired(email, password);
    const user = await log.findUserByEmailService(email);
    const { _id: id, role } = user;
    const token = await log.loginService(email, password, role, id);
    return res.status(code[20]).json({ token });
  } catch (error) {
    return res.status(error.code || code[50]).json({ message: error.message });
  }
};

module.exports = { login };
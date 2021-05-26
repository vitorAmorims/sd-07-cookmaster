const { loginService } = require('../services/users');
const { code } = require('../helpers/messages');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password);
    console.log('loginUser', token);
    return res.status(code[20]).json({ token });
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

module.exports = { login };
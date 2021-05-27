const { loginService, findUserByEmail } = require('../services/users');
const { code } = require('../helpers/messages');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { _id, role } = await findUserByEmail(email);
    const token = await loginService(email, password, role, _id);
    console.log('loginUser', token);
    return res.status(code[20]).json({ token });
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

module.exports = { login };
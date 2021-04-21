const loginService = require('../services/loginService');

const addLogin = async (req, res) => {
  const { email, password } = req.body;

  const { code, message, token } = await loginService.sendToken(email, password);
  
  if (!token) return res.status(code).json({ message });
  
  res.status(code).json({ token });
};

module.exports = {
  addLogin,
};
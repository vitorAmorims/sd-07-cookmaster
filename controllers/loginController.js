const loginService = require('../services/loginService');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userlogged = await loginService.loginUser(email, password);
    const { http, message } = userlogged;
    res.status(http).json(message);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro interno', error: error.message });
  }
};

module.exports = {
  login,
};
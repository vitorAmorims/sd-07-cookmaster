const loginService = require('../Service/login');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await loginService.login(email, password);
    res.status(200).json({ token: response });
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = {
  login,
};
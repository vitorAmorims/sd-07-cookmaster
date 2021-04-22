const { login } = require('../services/loginServices');

const ERROR = 500;

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { http, message } = await login(email, password);
    return res.status(http).json(message);
  } catch (error) {
    return res.status(ERROR).send({ message: error });
  }
};

module.exports = { handleLogin };

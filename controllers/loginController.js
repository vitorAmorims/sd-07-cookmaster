const loginServices = require('../services/loginServices');

const validateLogin = async (req, res) => {
  const login = req.body;

  try {
    const response = await loginServices.validateLogin(login);

    res.status(response.status).json({ token: response.token });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

module.exports = {
  validateLogin,
};

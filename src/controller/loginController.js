const loginService = require('../service/loginService');

const { C_200, C_401, C_500 } = loginService.statusHttp;

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginService.registerUser(email, password);
    if (token.fieldHalf) {
      return res.status(C_401).send({ message: token.message });
    }
    if (token.checkFail) {
      return res.status(C_401).send({ message: token.message });
    }
    res
      .status(C_200)
      .send({ token });
  } catch (error) {
    console.error(error);
    return res.status(C_500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
};

const jwt = require('jsonwebtoken');
const { loginService } = require('../../Services/userService');
require('dotenv').config();

// Secret for remote test
const SECRET_PASS = 'minhasenhamuitosegura';

const jwtConfig = {
    expiresIn: 60 * 5,
    algorithm: 'HS256',
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginService(email, password);
    const token = jwt.sign({ data: result[0].email },
      SECRET_PASS, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    console.log(`Erro in controller login: ${error}`);
  }
};

module.exports = {
  loginController,
};

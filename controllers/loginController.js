const jwt = require('jsonwebtoken');

const secret = 'cookmaster';

const login = async (req, res) => {
  try {
    const { email } = req.body;

    const jwtConfig = { expiresIn: 60 * 10, algorithm: 'HS256' };
    const token = jwt.sign({ data: email }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {
  login,
};

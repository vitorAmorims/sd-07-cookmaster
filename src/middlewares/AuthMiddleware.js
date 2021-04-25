const jwt = require('jsonwebtoken');
const userService = require('../services/UserService');

const segredo = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, segredo);
    const { data: { email, password } } = decoded;
    const userLogin = await userService.checkUserLogin({ email, password });
    if (!userLogin) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.userLogin = userLogin;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

const jwt = require('jsonwebtoken');
const userService = require('../services/UserService');

const segredo = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }
  try {
    const decoded = jwt.verify(token, segredo);
    const { data: { email, password } } = decoded;
    const { _id: userId } = await userService.checkUserLogin({ email, password });
    if (!userId) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.userId = userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

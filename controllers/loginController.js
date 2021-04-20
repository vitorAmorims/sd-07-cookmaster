const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const loginService = require('../service/loginService');

const usersService = require('../service/usersService');

const STATUS_CREATED = 200;
const JWT_SECRET = 'meuSegredo';

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersService.findEmail(email);
    const payload = {
      id: ObjectID(user.id),
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, JWT_SECRET);
    await loginService.login(user.email, password);
    return res.status(STATUS_CREATED).json({ token });
  } catch (error) {
    console.error({ message: 'Não entrou no controller' });
  }
};

module.exports = {
  login,
};

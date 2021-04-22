const jwt = require('jsonwebtoken');
const usersService = require('../services/usersService');
const { usersValidation } = require('../services/usersValidation');

const secret = 'abc';
const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const reqUser = req.body;
        await usersValidation(reqUser);
        const newUser = await usersService.createUser(name, email, password);
        const { role, _id } = newUser;
        res.status(201).json({
            user: {
                name, 
                email,
                role,
                _id,
            },
        });
    } catch (err) {
        next(err);
      }
};

const createLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
          return res.status(401).json({ message: 'É necessário usuário e senha para fazer login' });
        }
            const user = await usersService.createLogin(username);
        if (!user) {
            return res.status(401).json({ message: 'Usuário não existe' });
        }
        const jwtConfig = { expiresIn: '60s', algorithm: 'HS256' };
        const token = jwt.sign({ data: user.username }, secret, jwtConfig);
        res.status(200).json({ message: 'Login com sucesso', token });
    } catch (error) {
        res.status(500).json({
          message: 'Erro interno',
    });
    }
};

module.exports = {
  createUser,
  createLogin,
};

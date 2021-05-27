const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const { userValidation } = require('../services/userValidation');
const { loginValidation, passwordValidation } = require('../services/loginValidation');

const secret = 'abc';
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = req.body;
    await userValidation(user);
    const newUser = await userService.createUser(name, email, password);
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

const newLogin = async (req, res, next) => {
  try {
    const bodyLogin = req.body;
    const loginEmail = req.body.email;
    const loginPass = req.body.password;
    await loginValidation(bodyLogin);
    const login = await userService.createLogin(loginEmail);
    const { _id, email, role, password } = login;
    const loginPassaword = password;
    passwordValidation(loginPass, loginPassaword);
    const jwtConfig = { expiresIn: '600s', algorithm: 'HS256' };
    const token = jwt.sign({ data: [_id, email, role] }, secret, jwtConfig);
    res.status(200).json({ token });
} catch (err) {
    next(err);
}
};

module.exports = {
  createUser,
  newLogin,
};

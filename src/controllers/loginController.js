const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const userServices = require('../services/loginServices');

const secret = 'tokensecreto';

const {
  OK_200,
  UNAUTHORIZED_401 } = require('../util');

const login = rescue(async (req, res) => {
  try {
    const { email, password } = req.body;
    const isValid = await userServices.loginServices(email, password);
    console.log(isValid);
    if (isValid) {
      throw new Error();
    }
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: email }, secret, jwtConfig);
    res.status(OK_200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(UNAUTHORIZED_401).send({ message: 'Incorrect username or password' });
  }
});

module.exports = {
  login,
};

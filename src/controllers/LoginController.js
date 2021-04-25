const express = require('express');
const jwt = require('jsonwebtoken');
const { emailVerify, passwordVerify } = require('../middlewares/UserMiddlewares');
const userService = require('../services/UserService');
const { OK, UNAUTHORIZED } = require('../helpers/HttpStatusCodes');

const router = express.Router();

const secret = 'seusecretdetoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

router.post('/', emailVerify, passwordVerify, async (req, res) => {
  const user = req.body;
  try {
    await userService.checkUserLogin(user);
    const token = jwt.sign({ data: user }, secret, jwtConfig);
    res.status(OK).json({ token });
  } catch (error) {
    res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }    
});

module.exports = router;
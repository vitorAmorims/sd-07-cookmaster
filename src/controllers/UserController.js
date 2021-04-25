const express = require('express');
const { nameVerify, emailVerify, passwordVerify } = require('../middlewares/BodyMiddlewares');
const userService = require('../services/UserService');
const { CREATED, CONFLICT } = require('../helpers/HttpStatusCodes');

const router = express.Router();

router.post('/', nameVerify, emailVerify, passwordVerify, async (req, res) => {
  const user = req.body;
  try {
    const registeredUser = await userService.create(user);
    res.status(CREATED).json({ user: registeredUser });
  } catch (error) {
    res.status(CONFLICT).json({ message: 'Email already registered' });
  }    
});

module.exports = router;

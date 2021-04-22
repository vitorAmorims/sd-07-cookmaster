const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');
const userVerify = require('../Middleware/Verify/userVerify');

const router = express.Router();
const secret = 'aoifuh98e3our-031irkfkmcqp';
const jwtConfig = {
  expiresIn: 60 + 5,
  algorithm: 'HS256',
};

router.post('/users', userVerify.userCreate, async (req, res) => {
  try {
    const { name, email } = req.body;
    let { password } = req.body;
    let { role } = req.body;
    if (!role) role = 'user';
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(5));
    const resp = await userModel.createUser(name, email, password, role);
    return res.status(201).json({ user: resp });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Erro interno',
    });
  }
});

router.post('/login', userVerify.userLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findUserByEmail(email);
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'invalid credentials' });
    const token = jwt.sign({ data: user.email }, secret, jwtConfig);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({});
  }
});

module.exports = router;
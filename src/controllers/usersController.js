const rescue = require('express-rescue');
const usersService = require('../services/usersService');

const createdStatus = 201;
const okStatus = 200;

const newUser = rescue(async (req, res) => {
    const { name, email, password } = req.body;

    const newRegisterUser = await usersService.add(name, email, password);
    
    res.status(createdStatus).json({ user: newRegisterUser });
});

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;

  const token = await usersService.login(email, password);
  
  res.status(okStatus).json({ token });
});

// const getByID = rescue(async (req, res) => {

// });

module.exports = {
  newUser,
  userLogin,
};

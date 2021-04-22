const rescue = require('express-rescue');
const usersModel = require('../models/usersModel');

const {
  CREATED_201 } = require('../util');

const users = rescue(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await usersModel.add(name, email, password);

    res.status(CREATED_201).json({ user: newUser });
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
});

module.exports = {
  users,
};

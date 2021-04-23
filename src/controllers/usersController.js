const usersService = require('../services/usersService');

// const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_CONFLICT = 409;
const STATUS_BAD_REQUEST = 400;

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const result = await usersService.createUser(name, email, password);

  if (result === 'Invalid entries. Try again.') {
    res.status(STATUS_BAD_REQUEST).json({ message: result });
  } else if (result === 'Email already registered') {
    res.status(STATUS_CONFLICT).json({ message: result });
  } else {
    res.status(STATUS_CREATED).json({ user: result });
  }
};

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const result = await usersService.createAdmin(
    name,
    email,
    password,
    req.role,
  );

  if (result === 'Only admins can register new admins') {
    res.status(403).json({ message: result });
  } else {
    res.status(STATUS_CREATED).json({ user: result });
  }
};

module.exports = { createUser, createAdmin };

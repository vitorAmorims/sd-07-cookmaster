const serviceUsers = require('../services/serviceUsers');

const CREATED = 201;
const BAD_REQUEST = 400;
const CONFLICT = 409;

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const result = await serviceUsers.createUser(name, email, password);

  if (result === 'Invalid entries. Try again.') {
    res.status(BAD_REQUEST).json({ message: result });
  } else if (result === 'Email already registered') {
    res.status(CONFLICT).json({ message: result });
  } else {
    res.status(CREATED).json({ user: result });
  }
};

const createAdm = async (req, res) => {
  const { name, email, password } = req.body;

  const result = await serviceUsers.createAdm(
    name,
    email,
    password,
    req.role,
  );

  if (result === 'Only admins can register new admins') {
    res.status(403).json({ message: result });
  } else {
    res.status(CREATED).json({ user: result });
  }
};

module.exports = { createUser, createAdm };

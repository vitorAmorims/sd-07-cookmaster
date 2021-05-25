const UsersService = require('../services/UsersService');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const { code, message, user } = await UsersService.create(name, email, password);

  if (message) return res.status(code).send({ message });

  res.status(201).send(user);
};

// const createAdmin = (req, res) => {

// };

// const login = (req, res) => {

// };

module.exports = {
  create,
  // createAdmin,
  // login,
};

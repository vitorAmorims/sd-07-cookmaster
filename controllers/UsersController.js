const UsersService = require('../services/UsersService');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const { code, message, user } = await UsersService.create(name, email, password);

  if (message) return res.status(code).send({ message });

  res.status(201).send(user);
};

// const createAdmin = (req, res) => {

// };

const login = async (req, res) => {
  const { email, password } = req.body;
  const { code, message, token } = await UsersService.login(email, password);

  if (message) return res.status(code).send({ message });

  res.status(200).send({ token });
};

module.exports = {
  create,
  // createAdmin,
  login,
};

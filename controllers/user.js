const users = require('../services/users');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await users.registerUser(name, email, password);

  if (newUser.err === 'Email already registered') {
    return res.status(409).json({ message: newUser.err });
  }
  if (newUser.err) return res.status(400).json({ message: newUser.err });

  return res.status(201).json(newUser.data);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const loggedUser = await users.loginUser(email, password);

  if (loggedUser.err) return res.status(401).json({ message: loggedUser.err });
  return res.status(201).json(loggedUser);
};

module.exports = {
  registerUser,
  loginUser,
};
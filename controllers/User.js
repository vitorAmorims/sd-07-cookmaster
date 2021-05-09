const User = require('../service/User');

async function login(req, res) {
  const { email, password } = req.body;
  const token = await User.login(email, password);

  if (token.status === 'error') {
    return res.status(token.code).json({ message: token.message });
  }

  res.status(200).json(token);
}

async function createUser(req, res) {
  const { name, email, password } = req.body;
  const user = await User.createUser(name, email, password);

  if (user.status === 'error') {
    return res.status(user.code).json({ message: user.message });
  }

  res.status(201).json(user);
}

async function createAdmin(req, res) {
  const { name, email, password } = req.body;
  const { id: userId, role: userRole } = req.user;

  const user = await User.createAdmin(name, email, password, {
    userId,
    userRole,
  });

  if (user.status === 'error') {
    return res.status(user.code).json({ message: user.message });
  }

  res.status(201).json(user);
}

module.exports = {
  login,
  createUser,
  createAdmin,
};

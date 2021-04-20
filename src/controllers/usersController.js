const usersService = require('../services/usersService');

const createUser = async (req, res) => {
  try {
    const { createUser } = usersService;
    const { name, email, password } = req.body;
    const newUser = await createUser(name, email, password);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json('errou');
  }
}

module.exports = {
  createUser,
}
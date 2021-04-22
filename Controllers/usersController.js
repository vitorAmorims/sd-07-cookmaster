const usersService = require('../Services/usersService');

const addStatus = 201;

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await usersService.createUser(name, email, password);
    res.status(addStatus).json({ user: newUser });
  } catch (error) {
    console.error({ message: 'Erro no controller ' });
  }
};

module.exports = {
  createUser,
};

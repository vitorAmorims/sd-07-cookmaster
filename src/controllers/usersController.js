const usersService = require('../services/usersService');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await usersService.createUser(name, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    const { message, code } = error;
    res.status(code).json({
      message,
    });
  }
};

module.exports = {
  createUser,
};
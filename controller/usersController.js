const usersModels = require('../models/usersModels');

// const STATUS200 = 200;
const STATUS201 = 201;
const STATUS500 = 500;

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await usersModels.addUser(name, email, password);
    res.status(STATUS201).json({ user: result });
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
};

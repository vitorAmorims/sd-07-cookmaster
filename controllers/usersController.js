const usersModel = require('../models/usersModel');

const status201 = 201;
const status500 = 500;

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await usersModel.create(name, email, password);

    return res.status(status201).json(newUser);
  } catch (err) {
    return res.status(status500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
};

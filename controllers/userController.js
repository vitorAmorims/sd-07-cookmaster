const model = require('../models');

const createUserController = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await model.usersModel.createUser(name, email, password);
  return res.status(CREATED).send(newUser);
};

module.exports = {
  createUserController
};
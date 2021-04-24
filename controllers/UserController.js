// const bcrypt = require('bcrypt-nodejs');
const UserModel = require('../models/UserModel');
const { CREATED } = require('../utils/statusCode.json');

const create = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  // const salt = bcrypt.genSaltSync(5);
  // const cryptedPassword = bcrypt.hashSync(password, salt);

  const newUser = await UserModel.create({ name, email, password, role });
  // const newUser = await UserModel.create({ name, email, password: cryptedPassword, role });
  return res.status(CREATED).json(newUser);
};

module.exports = {
  create,
};

const UserModel = require('../models/UserModel');
const { CREATED } = require('../utils/statusCode.json');

const create = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;
  const newUser = await UserModel.create({ name, email, password, role });
  return res.status(CREATED).json(newUser);
};

module.exports = {
  create,
};

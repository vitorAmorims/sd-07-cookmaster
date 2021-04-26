const UsersService = require('../services/UsersService');

const SUCESS = 200;
const CREATED = 201;

const create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const role = 'user';
    const newUser = await UsersService.create(name, email, password, role);
    return res.status(CREATED).json(newUser);
  } catch (err) {
    next(err);
  }
};

const readAllUsers = async (_req, res, next) => {
  try {
    const users = await UsersService.readAllUsers();
    return res.status(SUCESS).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, readAllUsers };
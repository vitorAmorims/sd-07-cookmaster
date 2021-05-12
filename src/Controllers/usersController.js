const {
  createNewUser,
  getUsers,
} = require('../Services/usersService');

const OK = 200;
const CREATED = 201;

const userCreated = async (req, res) => {
  const user = { ...req.body, role: 'user' };
  await createNewUser(user);
  // console.log('Controller');
  return res.status(CREATED).json({ user });
};

const getAllUser = async (req, res) => {
  const allUsers = await getUsers();
  res.status(OK).json({ users: allUsers });
};

const adminCreated = async (req, res) => {
  const newUser = { ...req.body, role: 'admin' };
  await createNewUser(newUser);
  return res.status(CREATED).json({ newUser });
};

module.exports = {
  userCreated,
  getAllUser,
  adminCreated,
  // getById,
  // updateById,
  // excludeById
  // getAllSongs,
  // getById,
};
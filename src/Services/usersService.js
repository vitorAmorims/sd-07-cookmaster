const { createUser, getAllUsers } = require('../Models/usersModel');

const BADREQUEST = 400;
const CONFLICT = 409;

const createNewUser = async (data) => {
  const userInserted = await createUser(data);
  return userInserted;
};
const getUsers = async () => {
  const users = await getAllUsers();
  return users;
};

const validateEmail = (email) => {
  const regexEmail = /\S+@\S+.\S+/;
  return regexEmail.test(email);
};

const validateUniqueEmail = async (req, res, next) => {
  const { email } = req.body;
  const allUsers = await getUsers();
  const emailExists = await allUsers.find((users) => users.email === email);

  if (emailExists) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }

  next();
};

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password || !validateEmail(email)) {
    return res.status(BADREQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

module.exports = {
  validateUniqueEmail,
  createNewUser,
  getUsers,
  validateEmail,
  validateUser,
};

const JWT = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const { usersModel } = require('../models');
const { create, readByEmail, readAll, readById } = usersModel;
const { CONFLICT, SECRET, FORBIDDEN } = require('../helpers');

const validateEmail = email => {
  const regexEmail = /\S+@\S+\.\S+/i;
  return regexEmail.test(email);
};

const validateCreateUser = async (name, email, password) => {
  if (!name || !email || password === undefined || !validateEmail(email))
    throw new Error('Invalid entries. Try again.');

  const user = await readByEmail(email);
  if (user) return { status: CONFLICT, message: 'Email already registered' };

  const newUser = await create(name, email, password, 'user');
  if (!newUser.result.ok) throw new Error('Error validateCreateUser');

  return { _id: newUser.insertedId, name, email, role: 'user' };
};

const validateCreateAdmin = async (name, email, password, role) => {
  if (!name || !email || password === undefined || !validateEmail(email))
    throw new Error('Invalid entries. Try again.');

  const user = await readByEmail(email);
  if (user) return { status: CONFLICT, message: 'Email already registered' };

  if (role !== 'admin')
    return { status: FORBIDDEN, message: 'Only admins can register new admins' };
  
  const newUser = await create(name, email, password, role);
  if (!newUser.result.ok) throw new Error('Error validateCreateUser');

  return { _id: newUser.insertedId, name, email, role };
};

const validateCreateLoginToken = async email => {
  const user = await readByEmail(email);
  // console.log(user);

  const jwtConfig = {
    expiresIn: 60 * 5,
    algorithm: 'HS256',
  };

  // id, email e role
  const token = JWT.sign(
    { _id: user._id, email: user.email, role: user.role },
    SECRET,
    jwtConfig,
  );

  return token;
};

const validateReadAllUsers = async () => {
  const users = await readAll();
  if (!users) throw new Error('Error validateReadyAllUsers');
  return users;
};

const validateReadById = async id => {
  if (!ObjectID.isValid(id))
    return { status: NOT_FOUND, message: 'user not found' };
  const user = await readById(id);
  if (!user) throw new Error('Error validateReadById');
  return user;
};

module.exports = {
  validateCreateUser,
  validateCreateLoginToken,
  validateReadAllUsers,
  validateReadById,
  validateCreateAdmin,
};

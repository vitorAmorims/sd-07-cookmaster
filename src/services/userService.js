const JWT = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const { usersModel } = require('../models');

const { create, readByEmail, readAll, readById } = usersModel;
const {
  CONFLICT,
  SECRET,
  FORBIDDEN,
  NOT_FOUND,
  throwError,
} = require('../helpers');

const validateEmail = (email) => {
  const regexEmail = /\S+@\S+\.\S+/i;
  return regexEmail.test(email);
};

const validateCreateUser = async (name, email, password) => {
  throwError(
    !name || !email || password === undefined || !validateEmail(email),
    'Invalid entries. Try again.',
    null,
  );

  const user = await readByEmail(email);
  throwError(user, null, {
    status: CONFLICT,
    message: 'Email already registered',
  });

  const newUser = await create(name, email, password, 'user');
  throwError(!newUser.result.ok, 'Error validateCreateUser', null);

  return { _id: newUser.insertedId, name, email, role: 'user' };
};

const validateCreateAdmin = async (name, email, password, role) => {
  throwError(
    !name || !email || password === undefined || !validateEmail(email),
    'Invalid entries. Try again.', null,
  );

  const user = await readByEmail(email);
  throwError(user, null, {
    status: CONFLICT,
    message: 'Email already registered',
  });
  throwError(role !== 'admin', null, {
    status: FORBIDDEN,
    message: 'Only admins can register new admins',
  });

  const newUser = await create(name, email, password, role);
  throwError(!newUser.result.ok, 'Error validateCreateUser', null);
  return { _id: newUser.insertedId, name, email, role };
};

const validateCreateLoginToken = async (emailUser) => {
  const user = await readByEmail(emailUser);
  const { _id, email, role } = user;
  // console.log(user);

  const jwtConfig = {
    expiresIn: 60 * 5,
    algorithm: 'HS256',
  };

  // id, email e role
  const token = JWT.sign({ _id, email, role }, SECRET, jwtConfig);
  return token;
};

const validateReadAllUsers = async () => {
  const users = await readAll();
  if (!users) throw new Error('Error validateReadyAllUsers');
  return users;
};

const validateReadById = async (id) => {
  if (!ObjectID.isValid(id)) {
    return { status: NOT_FOUND, message: 'user not found' };
  }
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

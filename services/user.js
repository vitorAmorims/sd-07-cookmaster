const user = require('../models/user');

const errInvalidEntries = { 
  message: 'Invalid entries. Try again.',
 };
const errEmailAlreadyRegistered = {
  conflict: 409,
};

const verifyName = (name) => {
  if (!name || typeof name !== 'string') return false;

  return true;
};
const isEmailAlreadyExist = async (email) => {
  const result = await user.findByEmail(email);
  return result;
};
const verifyEmail = (email) => {
  const reg = /\S+@\S+\.\S+/;
  if (!email || typeof email !== 'string') return false;
  if (!reg.test(email)) return false; 

  return true;
};

const verifyPassword = (password) => {
  if (!password || typeof password !== 'string') return false;

  return true;
};
// const verifyRole = (role) => {
//   if (!password || typeof password !== 'string') return false;

//   return true;
// };
const isValid = async (email, password, name) => {
  const result = await isEmailAlreadyExist(email);
  if (!verifyName(name)) return errInvalidEntries;
  if (!verifyEmail(email)) return errInvalidEntries;
  if (!verifyPassword(password)) return errInvalidEntries;
  if (result !== null) return errEmailAlreadyRegistered;

  return true;
};

  const create = async (email, password, name) => {
  const role = 'user';
  const InvalidEntries = await isValid(email, password, name);

  if (typeof InvalidEntries === 'object') return InvalidEntries;

  const { insertedId } = await user.create(email, password, name, role);

  return {
    
      user: {
        name,
        email,
        role: 'user',
        _id: insertedId,
      },
    
  };
};

module.exports = {
  // updateById,
  // deleteProduct,
  // getAll,
  // findById,
  create,
};
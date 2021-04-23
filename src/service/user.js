const err = require('../erro');
const model = require('../model/user');

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;

const validate = (name, email, password) => {
  if (!name || !email || !password || !regexEmail.test(email)) {
    return err('Invalid entries. Try again.', 400);
  }
  return 'ok';
};

const createUser = async (name, email, password, role) => {
  const isValid = validate(name, email, password);
  if (isValid.message) {
    return isValid;
  }

  const userExists = await model.getByEmail(email);
  if (userExists) return err('Email already registered', 409);
  const isUserCreated = await model.createUser(
    name,
    email,
    password,
    role !== undefined ? role : 'user',
  );
  return isUserCreated !== undefined
    ? isUserCreated
    : err('Internal Problems. Try again.', 400);
};

module.exports = { createUser };

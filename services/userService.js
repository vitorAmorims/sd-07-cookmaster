const userModel = require('../models/usersModels');
const userSchema = require('../schemas/userSchema');

const created = 201;
const OK = 200;

const add = async (name, email, password) => {
  const validationNameAndPassowrd = await userSchema.validateNameAndPassword(name, password);
  const validationEmail = await userSchema.validateEmail(email);

  if (validationNameAndPassowrd.message) return validationNameAndPassowrd;
  if (validationEmail.message) return validationEmail;

  const user = await userModel.add(name, email, password, 'user');

  return { code: created, user };
};

const getAll = async () => {
  const user = await userModel.getAll();
  
  return { code: OK, user };
};

const addAdmin = async (name, email, password) => {
  const validationNameAndPassowrd = await userSchema.validateNameAndPassword(name, password);
  const validationEmail = await userSchema.validateEmail(email);

  if (validationNameAndPassowrd.message) return validationNameAndPassowrd;
  if (validationEmail.message) return validationEmail;

  const admin = await userModel.add(name, email, password, 'admin');

  return { code: created, admin };
};

module.exports = {
  getAll,
  add,
  addAdmin,
};

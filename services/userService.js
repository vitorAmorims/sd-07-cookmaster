const userModel = require('../models/usersModels');
const userSchema = require('../schemas/userSchema');

const created = 201;
const OK = 200;

const add = async (name, email, password, role) => {
  const validation1 = await userSchema.validatePost1(name, email, password);
  const validation2 = await userSchema.validatePost2(email);

  if (validation1.message) return validation1;
  if (validation2.message) return validation2;

  const user = await userModel.add(name, email, password, role);

  return { code: created, user };
};

const getAll = async () => {
  const user = await userModel.getAll();
  // console.log('userservice', user)
  return { code: OK, user };
};

module.exports = {
  getAll,
  add,
};

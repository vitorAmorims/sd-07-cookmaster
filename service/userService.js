const userModel = require('../model/userModel');

const getAll = async () => userModel.getAll();

const getByEmail = async (email) => userModel.getByEmail(email);

const create = async (name, email, password, role) => {
  // check duplicated
  const userDuplicated = await getByEmail(email);
  if (userDuplicated) return null;

  let roleGo = role;
  if (!role) roleGo = 'user';
  const newUser = await userModel.create(name, email, password, roleGo);
  return newUser;
};

const checkLogin = async (email, password) => {
  const user = await getByEmail(email);
  if (!user) {
    return null;
  }

  if (user.password !== password) {
    return null;
 }
  return user;
};

module.exports = { getAll, create, getByEmail, checkLogin };
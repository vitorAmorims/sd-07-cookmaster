const userModel = require('../model/userModel');

const isFull = (name) => {
  if (!name) return false;
  return true;
};

const emailAndPassword = async (email, password) => {
  const re = /^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const isValid = re.test(email);
  if (!isValid) {
    return false;
  }
  const passwordDB = await userModel.getPassword(email);
  if (password.length === 0 || password !== passwordDB[0].password) return false;
  return true;
};

const emailFormat = (email) => {
  const re = /^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const isValid = re.test(email);
  if (!isValid) {
    return false;
  }
  return true;
};

const validatorUser = (name, email, password) => {
  const allAreValid = isFull(name) && isFull(email) && isFull(password) && emailFormat(email);
  if (!allAreValid) return false;
  return true;
};

const validatorLogin = (email, password) => {
  const allAreValid = isFull(email) && isFull(password);
  if (!allAreValid) return false;
  return true;
};

const validatorRecipes = (name, ingredients, preparation) => {
  const allAreValid = isFull(name) && isFull(ingredients) && isFull(preparation);
  if (!allAreValid) return false;
  return true;
};

module.exports = { 
  validatorUser,
  emailAndPassword,
  validatorLogin,
  emailFormat,
  validatorRecipes,
 };

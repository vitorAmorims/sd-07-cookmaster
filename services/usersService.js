const usersModel = require('../models/usersModel');

const emptyEntry = (name, email, password) => {
  if (!name || !email || !password) {
    return true;
  }
};

const registerUser = async (name, email, password) => {
  const emptyEntries = emptyEntry(name, email, password);
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const validEmail = emailRegex.test(email);

  if (emptyEntries || !validEmail) {
    return { invalidMessage: 'Invalid entries. Try again.' };
  }

  const userEmail = await usersModel.getUserEmail(email);
  if (userEmail) return { emailExists: 'Email already registered' };
  
  const validUser = await usersModel.registerUser(name, email, password);

  return validUser;
};

module.exports = {
  registerUser,
};

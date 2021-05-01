const model = require('../models/userModel');

const createUser = async (newUser) => {
  const { insertedId } = await model.createUser(newUser);   
  return {
    user: {
      _id: insertedId,
      ...newUser,
      role: 'user',
    },
  };  
};

const findUserByEmail = async (mail) => {
  if (await model.findUserByEmail(mail)) return true;
  return false;
};

module.exports = {  
  findUserByEmail,
  createUser,
};
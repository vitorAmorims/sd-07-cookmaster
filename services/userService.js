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
  const user = await model.findUserByEmail(mail);
  return user;
};

module.exports = {  
  findUserByEmail,
  createUser,
};
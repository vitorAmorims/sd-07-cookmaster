const UserModel = require('../models/UserModel');

const userValidation = async (email, password) => {     
  const user = await UserModel.findByEmail(email);

  if (!user) return true;

  const { email: userEmail, password: userPass } = user;
    
  if (userEmail !== email || userPass !== password) return true;

  return false;
};

module.exports = userValidation;

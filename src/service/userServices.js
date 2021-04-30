const userModel = require('../models/userModel');

const createUser = (name, email, password) => {
  console.log('entro em service');
  userModel.createUser(name, email, password);
  console.log('saiu de Service');
};

module.exports = { createUser };

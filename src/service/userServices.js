const userModel = require('../models/userModel');

const createUser = async (name, email, password) => {
  console.log('entro em service');
  // console.log(await userModel.createUser(name, email, password));
  const response = await userModel.createUser(name, email, password);
  // console.log(response.ops);
  return response;
  // console.log('saiu de Service');
};

module.exports = { createUser };

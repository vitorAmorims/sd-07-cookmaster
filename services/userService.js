const userModel = require('../models/userModel');
const { code201 } = require('../utils/dictionary');

const addUser = async (request, response) => {
  const { name, email, password } = request.body;
  const { insertedId } = await userModel.addUser(name, email, password);

  const newUser = { name, email, role: 'user', _id: insertedId };

  return response.status(code201).send({ user: newUser });  
};

module.exports = {
  addUser,
};

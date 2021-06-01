const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { code201, code403, message } = require('../utils/dictionary');

const addUser = async (request, response) => {
  const { name, email, password } = request.body;
  const { insertedId } = await userModel.addUser(name, email, password);

  const newUser = { name, email, role: 'user', _id: insertedId };

  return response.status(code201).send({ user: newUser });  
};

const addAdmin = async (request, response) => {
  const { name, email, password } = request.body;
  const { authorization } = request.headers;
  const { role } = jwt.decode(authorization);

  if (role !== 'admin') {
    return response.status(code403).send({ message: message.onlyAdmin });
  }

  const { insertedId } = await userModel.addAdmin(name, email, password);

  const newAdmin = { name, email, role: 'admin', _id: insertedId };

  return response.status(code201).send({ user: newAdmin });
};

module.exports = {
  addUser,
  addAdmin,
};

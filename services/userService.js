const userModel = require('../models/userModel');
const { code201 } = require('../utils/dictionary');

const addUser = async (request, response) => {
  const { name, email, password } = request.body;
  const { insertedId } = await userModel.addUser(name, email, password);
  // console.log(`insertedId`, insertedId);
  // console.log(`name`, name);
  // console.log(`email`, email);
  // console.log(`password`, password);

  const newUser = {
    _id: insertedId,
    role: 'user',
    name,
    email,
    password,
  };

  return response.status(code201).send({ user: newUser });  
};

module.exports = {
  addUser,
};

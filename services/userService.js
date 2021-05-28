const userModel = require('../models/userModel');
const { code201, code400, code409 } = require('../utils/dictionary');

const addUser = async (request, response) => {
  const { name, email, password } = request.body;
  const { insertedId } = await userModel.addUser(name, email, password);
  // console.log('name', name);

  if (!name || !email || !password) {
    return response.status(code400).json({ message: 'invalid entries. Try again.' });
  }

  const emailReg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  const isValidEmail = emailReg.test(email);

  if (!isValidEmail) {
    return response.status(code400).json({ message: 'invalid entries. Try again' });
  }

  const emailExists = await userModel.userByEmail(email);

  if (emailExists) {
    return response.status(code409).json({ message: 'Email already registered' });
  }

  const newUser = { name, email, role: 'user', _id: insertedId };

  return response.status(code201).send({ user: newUser });  
};

module.exports = {
  addUser,
};

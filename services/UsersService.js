const UsersModel = require('../models/UsersModel');
const UsersSchema = require('../schemas/UsersSchema');

const create = async (name, email, password) => {
  const validData = UsersSchema.validUserData(name, email, password);
  if (validData.message) return validData;

  const validEmail = await UsersSchema.validUserEmail(email);
  if (validEmail.message) return validEmail;

  const user = await UsersModel.create(name, email, password);

  return ({ user: { user } });
};

module.exports = {
  create,
};

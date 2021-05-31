const userModel = require('../models/userModel');

const loginUser = async (request, response) => {
  const { email } = request.body;
  const { name, password, ...dataPayload } = await userModel.userByEmail(email);
  console.log(`name`, name);
  console.log(`password`, password);
  console.log(`dataPayload`, dataPayload);
};

module.exports = {
  loginUser,
};

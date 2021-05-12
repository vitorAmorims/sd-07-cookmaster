const { getUserByEmail } = require('../models/users');

const compareData = (data, request) => {
  if (!data) return 0;
  if (request.email !== data.email) return 0;
  if (request.password !== data.password) return 0;
  return 1;
};

const login = async (request, _response, next) => {
  const { email, password } = request.body;

  if (!email || !password) return next({ status: 401, message: 'All fields must be filled' });
  
  const data = await getUserByEmail(email);

  if (!compareData(data, { email, password })) {
    return next({ status: 401, message: 'Incorrect username or password' });
  }

  next();
};

module.exports = login;

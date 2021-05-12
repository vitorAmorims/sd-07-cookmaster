const { getUserByEmail } = require('../models/users');

const testValidEntries = (userData) => {
  const testEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  if (!userData.name) return 0;
  if (!userData.email) return 0;
  if (!userData.password) return 0;
  if (!testEmail.test(userData.email)) return 0;
  return 1;
};

const findEmail = async (email) => {
  const matchEmail = await getUserByEmail(email);

  if (!matchEmail) return 0;
  return 1;
};

const createUser = async (request, response, next) => {
  const userData = request.body;

  const invalidEntries = {
    status: 400,
    message: 'Invalid entries. Try again.',
  };

  if (!testValidEntries(userData)) return next(invalidEntries);
  
  const matchEmail = await findEmail(userData.email);
  if (matchEmail) {
    return next({
      status: 409,
      message: 'Email already registered',
    });
  }

  next();
};

module.exports = createUser;

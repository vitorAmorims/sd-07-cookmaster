const invalidEntries = { code: 400, message: 'Invalid entries. Try again.' };

const email = { code: 409, message: 'Email already registered' };

const loginEntries = { code: 401, message: 'All fields must be filled' };

const loginFailure = { code: 401, message: 'Incorrect username or password' };

module.exports = {
  invalidEntries,
  email,
  loginEntries,
  loginFailure,
};

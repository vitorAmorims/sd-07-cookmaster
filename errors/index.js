const invalidEntries = { code: 400, message: 'Invalid entries. Try again.' };

const email = { code: 409, message: 'Email already registered' };

const loginEntries = { code: 401, message: 'All fields must be filled' };

const loginFailure = { code: 401, message: 'Incorrect username or password' };

const invalidToken = { code: 401, message: 'jwt malformed' };

const missingToken = { code: 401, message: 'missing auth token' };

const invalidID = { code: 404, message: 'recipe not found' };

const invalidUser = { code: 401, message: 'user doesn\'t match recipe\'s user' };

module.exports = {
  invalidEntries,
  email,
  loginEntries,
  loginFailure,
  invalidToken,
  invalidID,
  missingToken,
  invalidUser,
};

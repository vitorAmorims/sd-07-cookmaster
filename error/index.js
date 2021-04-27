const invalidEntries = { code: 400, message: 'Invalid entries. Try again.' };
const emailRegistered = { code: 409, message: 'Email already registered' };
const incorrectLogin = { code: 401, message: 'Incorrect username or password' };
const loginInv = { code: 401, message: 'All fields must be filled' };
const tokenMissing = { code: 401, message: 'missing auth token' };
const notFoundRecipe = { code: 404, message: 'recipe not found' };

module.exports = {
  invalidEntries,
  emailRegistered,
  incorrectLogin,
  loginInv,
  tokenMissing,
  notFoundRecipe,
};
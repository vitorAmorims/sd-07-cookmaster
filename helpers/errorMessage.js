const invalidEntries = { message: 'Invalid entries. Try again.' };
const recipeNotFound = { message: 'recipe not found' };
const invalidToken = { message: 'jwt malformed' };
const missingToken = { message: 'missing auth token' };

module.exports = {
  invalidEntries,
  recipeNotFound,
  invalidToken,
  missingToken,
};

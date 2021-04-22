const message = {
  emptyField: {
    message: 'All fields must be filled',
  },
  invalidEmailOrPassword: {
    message: 'Incorrect username or password',
  },
  emailRegistered: {
    message: 'Email already registered',
  },
  invalidEntries: { message: 'Invalid entries. Try again.' },
  recipeNotFound: { message: 'recipe not found' },
  notAdmin: { message: 'Only admins can register new admins' },
};

module.exports = { message };
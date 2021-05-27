module.exports = {
  code: {
    20: 200,
    21: 201,
    24: 204,
    40: 400,
    41: 401,
    43: 403,
    44: 404,
    49: 409,
    50: 500,
  },
  message: {
    invalidEntries: 'Invalid entries. Try again.',
    emailAlreadyExists: 'Email already registered',
    usernameOrPasswordInvalid: 'Incorrect username or password',
    loginIsRequired: 'All fields must be filled',
    loginIsInvalid: 'Incorrect username or password',
    tokenMissing: 'missing auth token',
    tokenMalformed: 'jwt malformed',
    recipeNotFound: 'recipe not found',
  },
};
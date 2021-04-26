const servDictionary = {
  BAD_INPUT: 'wrong input',
  PASS_SETUP: {
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    returnScore: false,
    pointsPerUnique: 1,
    pointsPerRepeat: 1,
    pointsForContainingLower: 20,
    pointsForContainingUpper: 20,
    pointsForContainingNumber: 20,
    pointsForContainingSymbol: 20,
  },
  EMAIL_TAKEN: 'email in database',
  USER_NOT_FOUND: 'email not registered',
  MISSING_FIELDS: 'All fields must be filled',
  WRONG_PASSWORD: 'Wrong password',
  JWT_CONFIG: {
    expiresIn: '7d',
    algorithm: 'HS256',
  },
  BAD_INPUT_RECIPE: 'missing fields in recipe insertion',
  MISSING_RECIPES_DATA: 'db search returned empty',
};

module.exports = servDictionary;

const code = {
  bad_request: 400,
  created: 201,
  conflict: 409,
};

const message = {
  bad_request: 'Invalid enteries. Try again',
  conflict: 'Email already registered',
};

module.exports = { code, message };

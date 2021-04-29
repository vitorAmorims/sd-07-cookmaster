const code = {
  bad_request: 400,
  created: 201,
  conflict: 409,
  unauthorized: 401,
  ok: 200,
  not_found: 404,
  no_content: 204,
};

const message = {
  bad_request: 'Invalid entries. Try again.',
  conflict: 'Email already registered',
  unauthorized: 'All fields must be filled',
  incorrect_fields: 'Incorrect username or password',
  recipe_not_found: 'recipe not found',
  missing_auth: 'missing auth token',
};

module.exports = { code, message };

const INVALID_DATA_ERROR = {
    code: 'bad_request',
    message: 'Invalid entries. Try again.',
  };
  
  const CONFLICT_EMAIL_ERROR = {
    code: 'conflict',
    message: 'Email already registered',
  };
  
  const EMPTY_LOGIN_DATA_ERROR = {
    code: 'unauthorized',
    message: 'All fields must be filled',
  };
  
  const INVALID_LOGIN_DATA_ERROR = {
    code: 'unauthorized',
    message: 'Incorrect username or password',
  };

  const INVALID_TOKEN_DATA_ERROR = {
    code: 'unauthorized',
    message: 'jwt malformed',
  };

  const MISSING_TOKEN_DATA_ERROR = {
    code: 'unauthorized',
    message: 'missing auth token',
  };

  const NOT_FOUND_RECIPE = {
    code: 'not_found',
    message: 'recipe not found',
  };

  module.exports = { 
    INVALID_DATA_ERROR, 
    CONFLICT_EMAIL_ERROR, 
    EMPTY_LOGIN_DATA_ERROR,
    INVALID_LOGIN_DATA_ERROR,
    INVALID_TOKEN_DATA_ERROR,
    MISSING_TOKEN_DATA_ERROR,
    NOT_FOUND_RECIPE,
};
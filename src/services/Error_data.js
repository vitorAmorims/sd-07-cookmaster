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

  module.exports = { INVALID_DATA_ERROR, 
    CONFLICT_EMAIL_ERROR, 
    EMPTY_LOGIN_DATA_ERROR,
    INVALID_LOGIN_DATA_ERROR,
};
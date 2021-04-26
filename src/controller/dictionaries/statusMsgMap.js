const statusMsgMap = {
  'wrong input': {
    status: 400, message: 'Invalid entries. Try again.',
  },
  'email in database': {
    status: 409, message: 'Email already registered',
  },
  OK: {
    status: 200, message: false,
  },
  Created: {
    status: 201,
  },
  'email not registered': {
    status: 401, message: 'Incorrect username or password',
  },
  'All fields must be filled': {
    status: 401, message: 'All fields must be filled',
  },
  'Wrong password': {
    status: 401, message: 'Incorrect username or password',
  },
  'missing token': {
    status: 401, message: 'jwt malformed',
  },
  'missing fields in recipe insertion': {
    status: 400, message: 'Invalid entries. Try again.',
  },
  'db search returned empty': {
    status: 404, message: 'could not find data',
  },
};

module.exports = statusMsgMap;

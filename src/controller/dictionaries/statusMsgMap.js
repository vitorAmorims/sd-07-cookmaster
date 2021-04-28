const statusMsgMap = {
  'All fields must be filled': {
    status: 401, message: 'All fields must be filled',
  },
  'authMiddleware error': {
    status: 401, message: 'jwt malformed',
  },
  Created: {
    status: 201,
  },
  'db search returned empty': {
    status: 404, message: 'recipe not found',
  },
  deleted: {
    status: 204, message: null,
  },
  'email in database': {
    status: 409, message: 'Email already registered',
  },
  'email not registered': {
    status: 401, message: 'Incorrect username or password',
  },
  'missing auth token': {
    status: 401, message: 'missing auth token',
  },
  'missing fields in recipe insertion': {
    status: 400, message: 'Invalid entries. Try again.',
  },
  'missing token': {
    status: 401, message: 'jwt malformed',
  },
  OK: {
    status: 200, message: false,
  },
  'permition denied': {
    status: 401, message: 'missing auth token',
  },
  'wrong input': {
    status: 400, message: 'Invalid entries. Try again.',
  },
  'wrong password': {
    status: 401, message: 'Incorrect username or password',
  },
};

module.exports = statusMsgMap;

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
};

module.exports = statusMsgMap;

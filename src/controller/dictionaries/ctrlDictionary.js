const inputValidation = {
  'missing inputs': 'Bad Request',
  'wrong input': {
    message: 'Invalid entries. Try again.',
    status: 'Bad Request',
  },
};

module.exports = { inputValidation };
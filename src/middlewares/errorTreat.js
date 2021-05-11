const errorStatus = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
};

module.exports = (req, res) => {
  if (req.error.message === 'Invalid entries. Try again.') {
    return res.status(errorStatus.BAD_REQUEST).json({ message: req.error.message });
  }
  if (req.error.message === 'Email already registered') {
    return res.status(errorStatus.CONFLICT).json({ message: req.error.message });
  }
  if (req.error.message === 'All fields must be filled' 
    || req.error.message === 'Incorrect username or password') {
    return res.status(errorStatus.UNAUTHORIZED).json({ message: req.error.message });
  }

  return res.status(errorStatus.INTERNAL_ERROR).json({ message: 'Internal error' });
};
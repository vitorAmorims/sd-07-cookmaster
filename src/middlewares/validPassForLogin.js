const validPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  next();
};

module.exports = validPassword;

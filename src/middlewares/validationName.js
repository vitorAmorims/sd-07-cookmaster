const validName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') return res.status(400).json({ message: 'Invalid entries. Try again.' });
  next();
};

module.exports = validName;

const validReceipe = (req, res, next) => {
  const { ingredients, preparation } = req.body;

  if (!ingredients || ingredients === '' || !preparation || preparation === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = validReceipe;

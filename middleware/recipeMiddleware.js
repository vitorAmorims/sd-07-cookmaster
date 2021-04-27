const verifyRecipe = (req, resp, next) => {
  const { name, preparation, ingredients } = req.body;
  if (!name || !preparation || !ingredients) {
    resp.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = {
  verifyRecipe,
};

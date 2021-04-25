const entriesMessage = { message: 'Invalid entries. Try again.' };

const recipesEntriesMiddleware = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
      return res.status(400).json(entriesMessage);
  }
  next();
};

module.exports = recipesEntriesMiddleware;

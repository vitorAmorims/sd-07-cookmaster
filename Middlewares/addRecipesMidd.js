const addRecipesMidd = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).send({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};
module.exports = addRecipesMidd;
const erro = 400;
const addRecipesMidd = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(erro).send({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};
module.exports = addRecipesMidd;
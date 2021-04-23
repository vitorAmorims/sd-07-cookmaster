const { getRecipeById } = require('../../models/recipesModel');

const createRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const uploadImg = async (req, res, next) => {
  const recipe = await getRecipeById(req.params.id);
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ auth: false, message: 'missing auth token' });
  if (!recipe) return res.status(404).json({ message: 'recipe not found' });
  next();
};

module.exports = {
  createRecipe,
  uploadImg,
};

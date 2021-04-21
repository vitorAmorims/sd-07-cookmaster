const RecipeService = require('../services/RecipeService');
const { NOT_FOUND, UNAUTHORIZED } = require('../controllers/status');

module.exports = async (req, res, next) => {
  const { _id: userId, role } = req.user;
  const recipe = await RecipeService.get(req.params.id);
  if (!recipe) return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  
  if (recipe.userId !== userId && role !== 'admin') {
    return res.status(UNAUTHORIZED).json({ message: 'user not authorized' });
  }

  next();
};

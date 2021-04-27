const {
  addRecipe,
} = require('../Services/RecipeService');
const error = require('../error/index');

const addRecipes = async (req, res) => {
  const resOK = 201;
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: id } = req.user;
    if (!name || !ingredients || !preparation) throw error.invalidEntries;
    const newRecipe = await addRecipe(name, ingredients, preparation, id);
    res.status(resOK).json({ recipe: newRecipe });
  } catch (err) {
    res.status(err.code).json({
      message: err.message,
    });
  }
};

module.exports = {
  addRecipes,
};
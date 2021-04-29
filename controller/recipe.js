const Recipe = require('../service/recipe');

const addRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const userId = req.data._id;

    const { code, message, result } = await
     Recipe.addRecipe(name, ingredients, preparation, userId);

    if (!result) {
      return res.status(code).json({
        message,
      });
    }

    res.status(code).json({ recipe: result });
  } catch (err) {
    console.log(err);
  }
};

const getRecipes = async (req, res) => {
  try {
    const { code, message, result } = await Recipe.getRecipes();

    if (!result) {
      return res.status(code).json({
        message,
      });
    }

    res.status(code).json(result);
  } catch (err) {
    console.log(err);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, message, result } = await Recipe.getRecipeById(id);

    if (!result) {
      return res.status(code).json({
        message,
      });
    }

    res.status(code).json(result);
  } catch (err) {
    console.log(err);
  }
};

const editRecipeById = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const userId = req.data._id;
    const { role } = req.data;

    const { code, message, result } = await Recipe.editRecipeById(
      name, ingredients, preparation, userId, role, id,
);
    if (!result) {
 return res.status(code).json({
        message,
      }); 
}
    res.status(code).json(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addRecipe, getRecipes, getRecipeById, editRecipeById };

const recipeService = require('../services/recipeService');
const constants = require('../const');

const createRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;

    const createRecipeResult = await recipeService
        .createRecipe(name, ingredients, preparation, authorization);

    if (createRecipeResult.error) {
        return res.status(createRecipeResult.error.status).json({
            message: createRecipeResult.error.message,
        });
    }
    return res.status(constants.CREATED).json({ recipe: createRecipeResult });
};

const getAllRecipes = async (_req, res) => {
    const allRecipes = await recipeService.getAllRecipes();
    return res.status(constants.SUCCESS).json(allRecipes);
};

module.exports = {
    createRecipe,
    getAllRecipes,
};
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

const getRecipeById = async (req, res) => {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeById(id);

    if (recipe.error) {
        return res.status(recipe.error.status).json({ message: recipe.error.message });
    }

    return res.status(constants.SUCCESS).json(recipe);
};

const updateRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;
    const { id } = req.params;
   
    const updateRecipeResult = await recipeService.updateRecipe(
        id, name, ingredients, preparation, authorization,
    );
    
    return res.status(constants.SUCCESS).json(updateRecipeResult);
};

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
};
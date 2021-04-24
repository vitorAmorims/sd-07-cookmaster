const recipeService = require('../services/recipeService');

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
    return res.status(201).json({ recipe: createRecipeResult });
};

module.exports = {
    createRecipe,
};
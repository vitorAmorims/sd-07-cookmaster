const RecipeModel = require('../models/recipesModel');
const status = require('../utils/status');

const addRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const newRecipe = await RecipeModel.addRecipe(name, ingredients, preparation, _id);
    return res.status(status.created).json({ recipe: newRecipe });
};

const getAllRecipes = async (req, res) => {
    const allRecipes = await RecipeModel.getAllRecipes();
    return res.status(status.ok).json(allRecipes);
};

const getRecipeById = async (req, res) => {
    const { id } = req.params;
    const recipe = await RecipeModel.findRecipeById(id);
    if (!recipe) {
        return res.status(status.notFound).json({
            message: 'recipe not found',
        });
    }
    return res.status(status.ok).json(recipe);
};

const updateRecipe = async (req, res) => {
    const { body } = req;
    const { _id } = req.user;
    const { id } = req.params;
    const recipe = await RecipeModel.updateRecipe(id, body, _id);
    return res.status(status.ok).json(recipe);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const recipe = await RecipeModel.findRecipeById(id);
    if (!recipe) {
        return res.status(status.unprocessableEntity).json({ message: 'Recipe not found' });
    }
    await RecipeModel.deleteProduct(id);
    res.status(status.noContent).end();
};

const addImage = async (req, res) => {
    const { filename } = req.file;
    const { id } = req.params;
    const recipe = await RecipeModel.findRecipeById(id);
    const imagePath = `localhost:3000/images/${filename}`;
    recipe.image = imagePath;
    const recipeUpdated = await RecipeModel.addImage(id, recipe, imagePath);
    return res.status(status.ok).json(recipeUpdated);
};

module.exports = {
    addRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteProduct,
    addImage,
};

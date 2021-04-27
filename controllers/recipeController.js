const { StatusCodes } = require('http-status-codes');
const recipeModel = require('../models/recipeModel');

const createRecipe = (async (req, res, next) => {
    try {
        const { name, ingredients, preparation } = req.body;
        const { userId } = req;
        const newRecipe = await recipeModel.registerRecipe(name, ingredients, preparation, userId);
        if (!newRecipe) throw Error;
        return res.status(StatusCodes.CREATED).json({ recipe: newRecipe });
    } catch (error) {
        return next(error);
    }
});

const getAllRecipe = (async (_req, res, next) => {
    try {
        const allRecipes = await recipeModel.findAll();
        return res.status(StatusCodes.OK).json(allRecipes);
    } catch (err) {
        return next(err);
    }
});

const getRecipeById = (async (req, res, next) => {
    try {
        const { id } = req.params;
        const recipe = await recipeModel.findById(id);
        return res.status(StatusCodes.OK).json(recipe);
    } catch (err) {
        return next(err);
    }
});

module.exports = { createRecipe, getAllRecipe, getRecipeById };

const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const secret = 'minhaSenhaUltraSecreta';

const createNewRecipe = rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    if (
        name === undefined 
        || ingredients === undefined 
        || preparation === undefined
    ) {
        return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    const { token } = req.headers;
    const decoded = jwt.verify(token, secret);
    const { _id } = decoded.data;
    const newRecipe = await recipeModel.addRecipe(name, ingredients, preparation, _id);
    return res.status(200).json({
        recipe: newRecipe,
    });
});

const showAllRecipes = rescue(async (req, res) => {
    try {
        const recipeList = await recipeModel.findAllRecipes();
        return res.status(200).json(recipeList);
    } catch (error) {
        throw new Error(error);
    }
});

const showRecipeById = rescue(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const recipe = await recipeModel.findRecipeById(id);
        console.log(recipe);
        if (recipe === null) {
            return res.status(404).json({ message: 'recipe not found' });
        }
        return res.status(200).json(recipe);
    } catch (error) {
        return res.status(404).json({ message: 'recipe not found' });
    }
});

const updateRecipe = rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    if (
        name === undefined 
        || ingredients === undefined 
        || preparation === undefined
    ) {
        return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    await recipeModel.updateRecipe(id, name, ingredients, preparation);
    const newRecipe = await recipeModel.findRecipeById(id);
    return res.status(200).json(newRecipe);
});

const deleteRecipe = rescue(async (req, res) => {
    const { id } = req.params;
    const { token } = req.headers;
    try {
        const decoded = jwt.verify(token, secret);
        const { email, role } = decoded.data;
        const user = await userModel.findUserByEmail(email);
        if (user !== null || role === 'admin') {
            await recipeModel.deleteRecipe(id);
            return res.status(204).json({});
        }
    } catch (error) {
        return res.status(401).json({ message: 'missing auth token' });
    }
});

module.exports = {
    createNewRecipe,
    showAllRecipes,
    showRecipeById,
    updateRecipe,
    deleteRecipe,
};

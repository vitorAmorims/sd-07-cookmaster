const jwt = require('jsonwebtoken');
const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const secret = 'minhaSenhaUltraSecreta';

const createNewRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    console.log(token);
    const decoded = jwt.verify(token, secret);
    const { _id } = decoded.data;
    const newRecipe = await recipeModel.addRecipe(name, ingredients, preparation, _id);
    return res.status(201).json({
        recipe: newRecipe,
    });
};

const showAllRecipes = async (req, res) => {
    try {
        const recipeList = await recipeModel.findAllRecipes();
        return res.status(200).json(recipeList);
    } catch (error) {
        throw new Error(error);
    }
};

const showRecipeById = async (req, res) => {
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
};

const updateRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    console.log(id);
    await recipeModel.updateRecipe(id, name, ingredients, preparation);
    const newRecipe = await recipeModel.findRecipeById(id);
    return res.status(200).json(newRecipe);
};

const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization;
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
};

module.exports = {
    createNewRecipe,
    showAllRecipes,
    showRecipeById,
    updateRecipe,
    deleteRecipe,
};

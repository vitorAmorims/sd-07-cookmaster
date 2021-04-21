const codes = require('../services/codes');
const users = require('../models/usersModel');
const recipes = require('../services/recipesService');

const getAllRecipes = async (_req, res) => {
    try {
        const result = await recipes.getAllRecipes();
        return res.status(codes.sucess).json(result);
    } catch (error) {
        console.log(error.message);
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await recipes.getById(id);

        if (result.statusCode) {
            return res.status(result.statusCode).json({
                message: result.message,
            });
        }
        return res.status(codes.sucess).json(result);
    } catch (error) {
        console.log(error.message);
    }
};

const editRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    try {
        const result = await recipes.editRecipe(id, name, ingredients, preparation);
        if (result.statusCode) {
            return res.status(result.statusCode).json({
                message: result.message,
            });
        }
        return res.status(codes.sucess).json(result);
    } catch (error) {
        console.log(error.message);
    }
};

const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await recipes.deleteRecipe(id);
        if (result.statusCode) {
            return res.status(result.statusCode).json({
                message: result.message,
            });
        }

        res.status(codes.notContent).end();
    } catch (error) {
        console.log(error.message);
    }
};

const registerRecipe = async (req, res) => {
    try {
        const { user, body } = req;
        const { name, ingredients, preparation } = body;
        const userFind = await users.findUser(user.username);
        const result = await recipes.registerRecipe(name, ingredients, preparation, userFind.id);
        return res.status(201).json({
            recipe: {
                ...result,
                userId: userFind.id,
            },
        });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    registerRecipe,
    getAllRecipes,
    getById,
    editRecipe,
    deleteRecipe,
};
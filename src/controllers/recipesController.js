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

const registerRecipe = async (req, res) => {
    try {
        const { user, body } = req;
        const { name, ingredients, preparation } = body;
        const userFind = await users.findUser(user.user);
        const result = await recipes.registerRecipe(name, ingredients, preparation);
        
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
};
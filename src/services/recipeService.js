const recipeModel = require('../models/recipeModel');
const authService = require('./authService');
const userModel = require('../models/userModel');

const constants = require('../const');

const fieldIsValid = (field) => {
    if (field === undefined) return false;
    return true;
};

const getUserIdByEmail = async (email) => {
    const { _id: id } = await userModel.getUserByEmail(email);
    return id;
};

const createRecipe = async (name, ingredients, preparation, token) => {
    if (!fieldIsValid(name) || !fieldIsValid(ingredients) || !fieldIsValid(preparation)) {
        return { error: 
            { message: constants.invalidEntries,
              status: constants.BAD_REQEUST,
            },
        };
    }

    const { email } = authService.tokenIsValid(token);
    
    const userId = await getUserIdByEmail(email);

    const newRecipe = await recipeModel.create(name, ingredients, preparation, userId);  
    
    return newRecipe;
};

const getAllRecipes = async () => {
    const allRecipes = await recipeModel.getAll();
    return allRecipes;
};

module.exports = {
    createRecipe,
    getAllRecipes,
};
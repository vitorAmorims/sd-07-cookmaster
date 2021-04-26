const { ObjectId } = require('bson');
const modelForRecipe = require('../model/modelForRecipe');
const errorGenerator = require('../helpers/errorCreator');
const code = require('../helpers/status.json');
const message = require('../helpers/message.json');

const getAll = async () => {
    const recipes = await modelForRecipe.getAll();
    return recipes;
};

const getById = async (id) => {
    if (!ObjectId.isValid(id)) {
        return errorGenerator(code.Not_Found, message.recipe_not_found);
    }

    const recipe = await modelForRecipe.getById(id);

    if (recipe === null || !recipe) {
       return errorGenerator(code.Not_Found, message.recipe_not_found);
    }
    return recipe;
};

const create = async (name, ingredients, preparation, id) => {
    const recipe = await modelForRecipe.create(name, ingredients, preparation, id);
    return recipe;
};

const update = async (id, name, ingredients, preparation) => {
    const recipe = await modelForRecipe.update(id, name, ingredients, preparation);
    if (recipe === null || !recipe) {
        return errorGenerator(code.Not_Found, message.recipe_not_found);
    }
    return recipe;
};

const exclude = async (id) => {
    console.log(id);
    if (!ObjectId.isValid(id)) {
        return errorGenerator(code.Not_Found, message.recipe_not_found);
    }
    const recipe = await modelForRecipe.exclude(id);

    if (!recipe) {
        return errorGenerator(code.Not_Found, message.recipe_not_found);
    }
    return recipe;
};

const getUserById = async (id) => {
    const user = await modelForRecipe.getUserById(id);
    return user;
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    exclude,
    getUserById,
};
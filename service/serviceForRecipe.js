const modelForRecipe = require('../model/modelForRecipe');
const errorGenerator = require('../helpers/errorCreator');
const code = require('../helpers/status.json');
const message = require('../helpers/message.json');

const getAll = async () => {
    const recipes = await modelForRecipe.getAll();
    return recipes;
};

const getById = async (id) => {
    const recipe = await modelForRecipe.getById(id);
    console.log(recipe);
    if (recipe === null) {
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
    const recipe = await modelForRecipe.exclude(id);
    return recipe;
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    exclude,
};
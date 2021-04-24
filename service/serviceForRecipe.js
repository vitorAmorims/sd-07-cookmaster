const modelForRecipe = require('../model/modelForRecipe');

const create = async (name, ingredients, preparation, id) => {
    const recipe = await modelForRecipe.create(name, ingredients, preparation, id);
    return recipe;
};

module.exports = {
    create,
};
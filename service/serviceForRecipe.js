const modelForRecipe = require('../model/modelForRecipe');

const create = async (name, ingredients, preparation) => {
    const recipe = await modelForRecipe.create(name, ingredients, preparation);
    return recipe;
};

module.exports = {
    create,
};
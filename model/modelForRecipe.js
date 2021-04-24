const connection = require('../database/dbConfig');

const RECIPE_COLLECTION = 'recipes';

const create = async (name, ingredients, preparation) => {
    const recipe = await connection()
        .then((dataBase) => dataBase.collection(RECIPE_COLLECTION)
        .insertOne({ name, ingredients, preparation }));
    return recipe;
};

module.exports = {
    create,
};
const conn = require('../../conn');

const create = async (name, ingredients, preparation, userId) => (
        conn().then(async (db) => {
            const newRecipe = await db.collection('recipes').insertOne({
                name,
                ingredients,
                preparation,
                userId,
            });
            return newRecipe.ops[0];
        })
    );

const getAll = async () => (
        conn().then(async (db) => {
            const allRecipes = await db.collection('recipes').find().toArray();
            return allRecipes;
        })
    );

module.exports = {
    create,
    getAll,
};
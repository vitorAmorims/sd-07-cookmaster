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

module.exports = {
    create,
};
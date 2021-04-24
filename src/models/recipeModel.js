const { ObjectId } = require('mongodb');
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

const getById = async (id) => (
        conn().then(async (db) => {            
            if (!ObjectId.isValid(id)) return undefined;
            const recipe = await db.collection('recipes').findOne({
                _id: ObjectId(id),
            });            
            return recipe;
        })
    );

module.exports = {
    create,
    getAll,
    getById,
};
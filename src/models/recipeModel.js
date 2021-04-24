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

const update = async (id, name, ingredients, preparation) => (
        conn().then(async (db) => {
            await db.collection('recipes').updateOne(
                { _id: ObjectId(id) },
                { $set: { name, ingredients, preparation } },
            );

            return { name, ingredients, preparation, _id: id };
        })
    );

const exclude = async (id) => (
        conn().then(async (db) => 
            db.collection('recipes').deleteOne({ _id: ObjectId(id) }))
    );

module.exports = {
    create,
    getAll,
    getById,
    update,
    exclude,
};
const { ObjectId } = require('mongodb');
const connection = require('../../config/connection');

const getAllRecipes = async () => {
    const result = await connection()
        .then((db) => db.collection('recipes').find().toArray());

    return result;
};

const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const result = await connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));
   
    return result;
};

const registerRecipe = async (name, ingredients, preparation) => {
    const result = await connection()
        .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));

    return {
        _id: result.insertedId,
        name,
        ingredients,
        preparation,
    };
};

module.exports = {
    registerRecipe,
    getAllRecipes,
    getById,
};
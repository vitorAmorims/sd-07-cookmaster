const { ObjectId } = require('mongodb');
const connect = require('../config/connection');

const addRecipe = async (name, ingredients, preparation, userId) => {
    const product = await connect().then((db) =>
        db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
    return product.ops[0];
};

const getAllRecipes = async () => {
    const allRecipes = await connect()
        .then((db) => db.collection('recipes').find().toArray());
    return allRecipes;
};

const findRecipeById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const recipe = await connect().then((db) => db.collection('recipes').findOne(ObjectId(id)));
    return recipe;
};

const updateRecipe = async (id, body, userId) => {
    const { name, ingredients, preparation } = body;
    return connect().then(async (db) => {
        await db
            .collection('recipes')
            .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
        return { _id: id, name, ingredients, preparation, userId };
    });
};

const addImage = async (id, recipe, image) => {
    const { name, ingredients, preparation, userId } = recipe;
    return connect().then(async (db) => {
        await db
            .collection('recipes')
            .updateOne({ _id: ObjectId(id) }, { $set: { image } });
        return { _id: id, name, ingredients, preparation, userId, image };
    });
};

const deleteProduct = async (id) => connect()
    .then(async (db) => db.collection('recipes')
        .deleteOne({ _id: ObjectId(id) }));

module.exports = {
    addRecipe,
    getAllRecipes,
    findRecipeById,
    updateRecipe,
    deleteProduct,
    addImage,
};

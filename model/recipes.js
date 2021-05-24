const connection = require('./connection');
const collection = require('./collections');

const create = (newRecipe) => connection()
    .then((db) => db.collection(collection.RECIPES).insertOne({ ...newRecipe }))
    .then((result) => ({ recipe: { _id: result.insertedId, ...newRecipe } }));

module.exports = { create };

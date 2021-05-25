const connection = require('./connection');
const collection = require('./collections');

const getAll = () => connection()
      .then((db) => db.collection(collection.RECIPES).find().toArray());  

const create = (newRecipe) => connection()
    .then((db) => db.collection(collection.RECIPES).insertOne({ ...newRecipe }))
    .then((result) => ({ recipe: { _id: result.insertedId, ...newRecipe } }));

module.exports = { create, getAll };

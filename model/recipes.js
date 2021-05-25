const { ObjectId } = require('mongodb');
const connection = require('./connection');
const collection = require('./collections');

const create = (newRecipe) => connection()
    .then((db) => db.collection(collection.RECIPES).insertOne({ ...newRecipe }))
    .then((result) => ({ recipe: { _id: result.insertedId, ...newRecipe } }));

const getAll = () => connection()
    .then((db) => db.collection(collection.RECIPES).find().toArray());  

const getById = (id) => connection()
    .then((db) => db.collection(collection.RECIPES).findOne({ _id: ObjectId(id) }))
    .catch((err) => console.log('model.recipes.getById:', err.message));

const update = (id, newRecipe) => connection()
    .then((db) => db.collection(collection.RECIPES)
    .updateOne({ _id: ObjectId(id) }, { $set: { ...newRecipe } }, { upsert: true }))
    .then(() => ({ _id: ObjectId(id), ...newRecipe }))
    .catch((err) => console.log(`model.recipes.update: ${err.message}`));

const exclude = (id) => connection()
    .then((db) => db.collection(collection.RECIPES)
    .deleteOne({ _id: ObjectId(id) }));

module.exports = { create, getAll, getById, update, exclude };

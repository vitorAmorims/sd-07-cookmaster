const { ObjectId } = require('mongodb');

const { connection } = require('../database');

const { RECIPE } = require('../CODE_ERROR');

const createRecipe = async (name, ingredients, preparation, userId) =>
    connection()
    .then((db) => db.collection(RECIPE)
    .insertOne({ name, ingredients, preparation, userId }))
    .then((recipe) => ({ name, ingredients, preparation, userId, _id: recipe.insertedId }));

const findAllRecipe = async () =>
    connection()
    .then((db) => db.collection(RECIPE)
    .find({}).toArray());

const findRecipeId = async (id) =>
    connection()
    .then((db) => db.collection(RECIPE)
    .findOne({ _id: ObjectId(id) }));

const upRecipe = async (id, name, ingredients, preparation) =>
    connection()
    .then((db) => db.collection(RECIPE)
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } })
    .then(() => ({ _id: ObjectId(id), name, ingredients, preparation })));

const deleteRecipe = async (id) =>
    connection()
    .then((db) => db.collection(RECIPE)
    .deleteOne({ _id: ObjectId(id) })
    .then(() => findRecipeId(id)));

module.exports = { createRecipe, findAllRecipe, findRecipeId, upRecipe, deleteRecipe };

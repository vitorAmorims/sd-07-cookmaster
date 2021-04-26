const { ObjectId } = require('mongodb');
const connection = require('../config/connection');

const registerRecipe = async (name, ingredients, preparation, userId) => connection().then((db) =>
    db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ name, ingredients, preparation, userId, _id: result.insertedId }));

const findAllRecipes = async () => connection().then((db) =>
  db.collection('recipes').find({}).toArray());

const findRecipeById = async (id) => connection().then((db) =>
    db.collection('recipes').findOne({ _id: ObjectId(id) }));

const updateFoundRecipe = async (id, name, ingredients, preparation) => connection().then((db) =>
    db.collection('recipes').updateOne({ _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } })
      .then(() => ({ _id: ObjectId(id), name, ingredients, preparation })));
  
module.exports = {
  registerRecipe,
  findAllRecipes,
  findRecipeById,
  updateFoundRecipe,
};

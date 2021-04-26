const { ObjectId } = require('mongodb');
const connection = require('../config/connection');

const registerRecipe = async (name, ingredients, preparation, id) => connection().then((db) =>
    db.collection('recipes')
      .insertOne({ name, ingredients, preparation }))
    .then((result) => ({ name, ingredients, preparation, userId: id, _id: result.insertedId }));

const findAllRecipes = async () => connection().then((db) =>
  db.collection('recipes').find({}).toArray());

const findRecipeById = async (id) => connection().then((db) =>
    db.collection('recipes').findOne({ _id: ObjectId(id) }));

module.exports = {
  registerRecipe,
  findAllRecipes,
  findRecipeById,
};

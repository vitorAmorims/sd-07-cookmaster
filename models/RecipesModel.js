// const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const create = async (recipe) =>
  connection().then(async (db) => {
    const newRecipe = await db.collection('recipes')
      .insertOne(recipe);
    return { recipe: newRecipe.ops[0] };
  });
  
const getAll = async () =>
  connection().then(async (db) => {
    const recipes = await db.collection('recipes')
      .find().toArray();
    return recipes;
  });

  module.exports = {
  create,
  getAll,
};

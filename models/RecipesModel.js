// const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const create = async (recipe) =>
  connection().then(async (db) => {
    const newRecipe = await db.collection('recipes')
      .insertOne(recipe);
    return { recipe: newRecipe.ops[0] };
  });
  
  module.exports = {
  create,
};

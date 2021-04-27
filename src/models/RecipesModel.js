const { ObjectId } = require('mongodb');
const connect = require('../config/connection');

const create = async (name, ingredients, preparation, userId) => {
    const newRecipe = await connect()
      .then((db) => db.collection('recipes')
        .insertOne({ name, ingredients, preparation, userId }));  
    return { recipe: newRecipe.ops[0] };
  };

  const getAllRecipes = async () => {
    const recipes = await connect()
      .then((db) => db.collection('recipes')
        .find({}).toArray());  
    return recipes;
  };

  const getRecipeById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const recipe = await connect()
    .then((db) =>
      db.collection('recipes')
         .findOne(ObjectId(id)));
         console.log(id);
  return recipe;
  };

module.exports = { create, getAllRecipes, getRecipeById };
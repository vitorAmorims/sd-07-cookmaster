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

module.exports = { create, getAllRecipes };
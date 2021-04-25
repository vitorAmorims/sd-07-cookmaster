const connection = require('../../config/connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await connection()
  .then((db) =>
  db.collection('recipes')
  .insertOne({ name, ingredients, preparation }));
  return { _id: recipe.insertedId, name, ingredients, preparation, userId };
};

module.exports = {
  createRecipe,
};
const conn = require('../connection');

const createRecipe = async (name, ingredients, preparation, _id) => {
  const addRecipe = await conn().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation }));

  return { name, ingredients, preparation, userId: _id, _id: addRecipe.insertedId };
}; // req. 3

const getAllRecipes = async () => {
  const allRecipes = await conn().then((db) => db.collection('recipes').find().toArray());

  return allRecipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};

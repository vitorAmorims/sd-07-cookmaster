const connection = require('../config/connections');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const createdRecipe = await connection().then((db) =>
    db.collection('recipes').insertOne({
      name,
      ingredients,
      preparation,
      userId,
    }));
  return { recipe: createdRecipe.ops[0] };
};

const getAllRecipes = async () =>
  connection().then((db) => db.collection('recipes').find().toArray());

module.exports = {
  createRecipe,
  getAllRecipes,
};

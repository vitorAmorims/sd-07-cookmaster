const connect = require('../config/conn');

const collectionInUse = 'recipes';

const createRecipe = async (data) => {
  const { name, ingredients, preparation, userId } = data;
  const db = await connect();
  const { ops } = await db.collection(collectionInUse)
    .insertOne({ name, ingredients, preparation, userId });
  return ops;
};

const findRecipes = async () => {
  const db = await connect();
  return db.collection(collectionInUse).find();
};

const findRecipesById = async (id) => {
  const db = await connect();
  return db.collection(collectionInUse).findOne({ id });
};

module.exports = { createRecipe, findRecipes, findRecipesById };

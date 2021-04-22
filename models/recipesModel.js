const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation) => {
  const recipe = await connection().then((db) =>
      db.collection('recipes').insertOne({ name, ingredients, preparation }));
  return recipe.ops[0];
};

const getRecipes = async () => {
  const recipes = await connection().then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return recipe;
};

const updateRecipeById = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return null;
  await connection().then((db) => 
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

  return { _id: id, name, ingredients, preparation };
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipeById,
};
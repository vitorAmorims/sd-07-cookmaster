const { ObjectID } = require('bson');
const connection = require('../../configs');

const creatRecipe = async (recipe) => {
  const createdRecipe = await connection()
    .then((db) => db.collection('recipes')
      .insertOne(recipe));
  return createdRecipe.ops[0];
};

const getAllRecipes = async () => {
  const recipesListed = await connection()
    .then((db) => db.collection('recipes')
      .find().toArray());
  return recipesListed;
};

const getRecipesById = async (id) => {
  const recipeFound = await connection()
    .then((db) => db.collection('recipes')
      .findOne({ _id: ObjectID(id) }));
  return recipeFound;
};

const editRecipe = async (recipe) => {
  await connection()
  .then((db) => db.collection('recipes')
  .updateOne({ _id: ObjectID(recipe.recipeId) }, { $set: { ...recipe } }));
  const recipeEdited = await getRecipesById(recipe.recipeId);
  return recipeEdited || [];
};

const deletRecipe = async (id) => {
  const deletedRecipe = await connection()
    .then((db) => db.collection('recipes')
      .deleteOne({ _id: ObjectID(id) }));
  return deletedRecipe.result;
};

const addImageRecipe = async (id, image) => {
  await connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectID(id) }, { $set: { image } }));
  const insertedImag = await getRecipesById(id);
  return insertedImag;
};

module.exports = {
  editRecipe,
  deletRecipe,
  creatRecipe,
  getAllRecipes,
  getRecipesById,
  addImageRecipe,
};

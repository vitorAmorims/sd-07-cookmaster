const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createRecipe = async (name, ingredients, preparation, id) => 
  connect().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId: id }))
    .then((result) => result.ops[0]);

const getAllRecipes = async () => {
  const recipes = await connect()
    .then((db) => db.collection('recipes').find().toArray());
    return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipe = await connect()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return recipe;
};

const updateRecipe = async ({ id, reqBody }) => {
  if (!ObjectId.isValid(id)) return null;

  const modifyRecipe = await connect().then((db) =>
    db.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: reqBody },
      { returnOriginal: false },
    ));
  return modifyRecipe.value;
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  await connect().then((db) => 
    db.collection('recipes')
    .deleteOne(
      { _id: ObjectId(id) },
    ));
};

const addImage = async (id, image) => {
  if (!ObjectId.isValid(id)) return null;

  const recipeWithImage = await connect().then((db) => 
    db
      .collection('recipes')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { image } },
        { returnOriginal: false },
      )); 
    return recipeWithImage.value;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  addImage,
};

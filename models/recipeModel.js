const { ObjectId } = require('mongodb');
const conn = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await conn()
    .then((db) => db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId }));

    return recipe.ops[0];
};

const getAllRecipes = async () => {
  const recipes = await conn()
    .then((db) => db.collection('recipes').find().toArray());

    return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return conn().then((db) => db.collection('recipes').findOne(ObjectId(id)));
};

const updateRecipe = async ({ id, name, ingredients, preparation, userId }) => {
  await conn().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    {
      $set: {
        name,
        ingredients,
        preparation,
        userId,
      },
    },
  ));
  return ({
    _id: id,
    name,
    ingredients,
    preparation,
    userId,
  });
};

const deleteRecipe = async (id) => conn().then((db) => 
  db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

const insertImage = async (id) =>
  conn().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    {
      $set: { image: `localhost:3000/images/${id}.jpeg` },
    },
  ));

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  insertImage,
};

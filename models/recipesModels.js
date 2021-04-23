const { ObjectId } = require('mongodb');
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

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await connection().then((db) =>
    db.collection('recipes').findOne(ObjectId(id)));
  return recipe;
};

const updateRecipe = async (data, userId, id) => {
  const { name, ingredients, preparation } = data;
  await connection().then((db) =>
    db
      .collection('recipes')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation, userId } },
      ));
  return { _id: id, name, ingredients, preparation, userId };
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};

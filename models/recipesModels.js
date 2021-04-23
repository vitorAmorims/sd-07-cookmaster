const { ObjectId } = require('mongodb');
const connect = require('../config/conn');

const addRecipe = async (userId, name, ingredients, preparation) =>
  connect().then(async (db) => {
    const newRecipe = await db.collection('recipes')
      .insertOne({ userId, name, ingredients, preparation });
    return newRecipe.ops[0];
  });

const getRecipes = async () =>
  connect().then(async (db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('recipes').findOne(ObjectId(id)));
};

const updateRecipeById = async (id, newData, userId) => 
  connect().then(async (db) => {
    await db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: {
        name: newData.name,
        ingredients: newData.ingredients,
        preparation: newData.preparation } });

      return {
        _id: id,
        name: newData.name,
        ingredients: newData.ingredients,
        preparation: newData.preparation,
        userId,
      };
  });

const excludeRecipeById = async (id) => {
  connect().then(async (db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

  return {
    _id: id,
  };
};

const uploadRecipeImage = async (id, imagePath, recipeData) =>
  connect().then(async (db) => {
    await db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { image: imagePath } });

      return {
        _id: id,
        name: recipeData.name,
        ingredients: recipeData.ingredients,
        preparation: recipeData.preparation,
        userId: recipeData.userId,
        image: imagePath,
      };
  });

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
  updateRecipeById,
  excludeRecipeById,
  uploadRecipeImage,
};
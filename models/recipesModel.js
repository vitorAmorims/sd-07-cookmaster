const { ObjectId } = require('mongodb');
const connection = require('../configurations/connection');

const { DB_COLECTION_RECIPES } = process.env;

const createNewRecipes = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  return db.collection(DB_COLECTION_RECIPES).insertOne({ name, ingredients, preparation, userId });
};

const getAllRecipes = async () => {
  const db = await connection();
  return db.collection(DB_COLECTION_RECIPES).find().toArray();
};

const getRecipesById = async (id) => {
  const db = await connection();
  try {
    return await db.collection(DB_COLECTION_RECIPES).findOne(new ObjectId(id));
  } catch (error) {
    throw new Error();
  }
};

const updateRecipesById = async (recipeObj) => {
  const { id, name, ingredients, preparation, userId } = recipeObj;
  const db = await connection();
  return db.collection(DB_COLECTION_RECIPES)
    .findOneAndUpdate(
      { _id: ObjectId(id) }, 
      { $set: { name, ingredients, preparation, userId } },
      { returnOriginal: false },
    );
};

const deleteRecipesById = async (id) => {
  const db = await connection();
  return db.collection(DB_COLECTION_RECIPES)
    .findOneAndDelete({ _id: ObjectId(id) });
};

const getUserIdByRecipeId = async (recipeId) => getRecipesById(recipeId);

const uploadImage = async (id, imageName) => {
  const db = await connection();
  return db.collection(DB_COLECTION_RECIPES)
    .findOneAndUpdate(
      { _id: ObjectId(id) }, 
      { $set: { image: imageName } },
      { returnOriginal: false },
    );
};

module.exports = {
  createNewRecipes,
  getAllRecipes,
  getRecipesById,
  updateRecipesById,
  deleteRecipesById,
  getUserIdByRecipeId,
  uploadImage,
};
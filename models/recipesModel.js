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

module.exports = {
  createNewRecipes,
  getAllRecipes,
};
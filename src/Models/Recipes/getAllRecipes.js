const connection = require('../connection');
require('dotenv').config();

// Collection remote test
const DB_COLLECTION_RECIPES = 'recipes';

const getRecipes = (result) => result;

const getAllRecipes = async () =>
  connection()
    .then((db) =>
      db.collection(DB_COLLECTION_RECIPES).find({}))
    .then((result) => getRecipes(result).toArray())
    .catch((error) => console.log(`Error in model addUser: ${error}`));

module.exports = { getAllRecipes };

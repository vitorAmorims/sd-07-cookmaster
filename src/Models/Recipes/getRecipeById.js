const { ObjectId } = require('bson');
const connection = require('../connection');
require('dotenv').config();

// Collection remote test
const DB_COLLECTION_RECIPES = 'recipes';

const getRecipe = (result) => result;

const getRecipeById = async (id) =>
  connection()
    .then((db) =>
      db.collection(DB_COLLECTION_RECIPES).findOne({
        _id: ObjectId(id),
      }))
    .then((result) => getRecipe(result))
    .catch((error) => console.log(`Error in model getRecipeId: ${error}`));

module.exports = { getRecipeById };

const { ObjectId } = require('bson');
const { getRecipeById } = require('./getRecipeById');
const connection = require('../connection');
// require('dotenv').config();

// Collection remote test
const DB_COLLECTION_RECIPES = 'recipes';

const getRecipe = (result) => result; 

const deletRecipe = async (id) => {
    const recipeId = ObjectId(id);
    const recipe = await getRecipeById(id);

 return connection()
    .then((db) =>
      db.collection(DB_COLLECTION_RECIPES)
      .deleteOne({
          _id: recipeId,
      }))
    .then(() => getRecipe(recipe))
    .catch((error) => console.log(`Error in model updateRecipeId: ${error}`));
};
module.exports = { deletRecipe };

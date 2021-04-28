const connection = require('../connection');
require('dotenv').config();

// Collection remote test
const DB_COLLECTION_RECIPES = 'recipes';

const getNewRecipe = ({ id, name, ingredients, preparation, user }) => ({
  recipe: {
    name,
    ingredients,
    preparation,
    user,
    _id: id,
  },
});

const addRecipe = async (name, ingredients, preparation, user) =>
  connection()
    .then((db) =>
      db.collection(DB_COLLECTION_RECIPES).insertOne({
        name,
        ingredients,
        preparation,
        user,
      }))
      
    .then((result) => getNewRecipe({ id: result.insertedId, name, ingredients, preparation, user }))
    .catch((error) => console.log(`Error in model addUser: ${error}`));

module.exports = { addRecipe };

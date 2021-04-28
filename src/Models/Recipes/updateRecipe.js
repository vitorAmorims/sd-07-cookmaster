const { ObjectId } = require('bson');
const connection = require('../connection');
require('dotenv').config();

// Collection remote test
const DB_COLLECTION_RECIPES = 'recipes';

const getRecipe = (result) => result; 

const updateRecipe = async (name, ingredients, preparation, id) => {
const params = { $set: { name, ingredients, preparation } };
const options = { upsert: true };
const filter = { _id: ObjectId(id) };

 return connection()
    .then((db) =>
      db.collection(DB_COLLECTION_RECIPES)
      .updateOne(filter, params, options))
    .then(() => getRecipe({ _id: id, name, ingredients, preparation }))
    .catch((error) => console.log(`Error in model updateRecipeId: ${error}`));
};
module.exports = { updateRecipe };

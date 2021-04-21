const connection = require('./connection');

const RECIPES_COLLECTION = 'recipes';

const createRecipe = ({ name, ingredients, preparation, userId }) => 
  connection().then((db) => db.collection(RECIPES_COLLECTION).insertOne({
      name,
      ingredients,
      preparation,
      userId,
  })).then((result) => ({
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
    },
    _id: result.insertedId,
  }));

module.exports = {
  createRecipe,
};
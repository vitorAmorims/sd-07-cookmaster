const conn = require('../config/connection');

const create = async (name, ingredients, preparation, userId) => {
  const recipe = await conn().then((db) => db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId }));

  return { recipe: {
    name,
    ingredients,
    preparation,
    userId,
    _id: recipe.insertedId, 
  } };
};

module.exports = {
  create,
};

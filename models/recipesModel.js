const connect = require('./connection');

const registerRecipes = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connect().then((db) =>
    db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: insertedId,
    },
  };
};

module.exports = {
  registerRecipes,
};

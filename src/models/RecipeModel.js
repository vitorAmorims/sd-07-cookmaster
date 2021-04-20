const database = require('../database');

const recipesCollection = 'recipes';

module.exports = {
  create: async (name, ingredients, preparation, userId) => {
    const db = await database.connect();
    const { ops } = await db.collection(recipesCollection).insertOne({
      name,
      ingredients,
      preparation,
      userId,
    });
    return ops;
  },
};

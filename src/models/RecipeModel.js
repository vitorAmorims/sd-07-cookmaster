const database = require('../database/database');

const recipesCollection = 'recipes';

module.exports = {
  index: async () => {
    const db = await database.connect();
    return db.collection(recipesCollection).find({}).toArray();
  },
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
  getById: async (id) => {
    const db = await database.connect();
    return db.collection(recipesCollection).findOne({ _id: id });
  },
};

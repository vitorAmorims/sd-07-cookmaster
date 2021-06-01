const connection = require('./connection');

const COLL_NAME = 'recipes';

const addRecipe = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection(COLL_NAME)
  .insertOne({ name, ingredients, preparation, userId }));

  const getAll = async () => connection()
    .then((db) => db.collection(COLL_NAME).find().toArray());

module.exports = {
  addRecipe,
  getAll,
};

const connection = require('./connection');

const COLL_NAME = 'users';

const addRecipe = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection(COLL_NAME)
  .insertOne({ name, ingredients, preparation, userId }));

module.exports = {
  addRecipe,
};

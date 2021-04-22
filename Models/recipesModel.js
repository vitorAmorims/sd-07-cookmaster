const { ObjectID } = require('mongodb');
const connection = require('../Config/connection');

const createRecipes = async (name, ingredients, preparation, id) => connection()
  .then((db) => db
  .collection('recipes')
  .insertOne({ name, ingredients, preparation, userId: ObjectID(id) }))
  .then((result) => result.ops[0]);

module.exports = {
  createRecipes,
};

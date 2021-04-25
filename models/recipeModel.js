const { ObjectId } = require('mongodb');
const connect = require('../configuration/connection');

const create = async (recipe) => {
  const createdRecipe = await connect().then((db) =>
    db.collection('recipes').insertOne(recipe));
  return createdRecipe.ops[0];
};
const getAll = async () => {
  const recipes = await connect().then((db) =>
    db.collection('recipes').find().toArray());
  console.log('recipes no model', recipes);
  return recipes;
};
const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await connect().then((db) =>
    db.collection('recipes').findOne(ObjectId(id)));
  return recipe;
};

module.exports = {
  create,
  getAll,
  findById,
};
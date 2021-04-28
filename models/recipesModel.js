const { ObjectId } = require('mongodb');
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

const getAll = async () => {
  const recipes = await conn().then((db) => db
    .collection('recipes')
    .find().toArray());

  return recipes;
};

const getById = async (id) => {
  const recipe = await conn().then((db) => db
    .collection('recipes')
    .findOne(ObjectId(id)));

  return recipe;
};

module.exports = {
  create,
  getAll,
  getById,
};

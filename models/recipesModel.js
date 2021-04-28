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

const update = async (id, updateItem, userId) => {
  await conn().then((db) => db
    .collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { updateItem, userId } }));

  return {
    _id: id, 
    updateItem,
    userId,
  };
};

const exclude = async (id) => {
  await conn().then((db) => db
    .collection('recipes')
    .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};

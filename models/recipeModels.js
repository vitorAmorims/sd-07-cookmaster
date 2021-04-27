const { ObjectId } = require('mongodb');

const connect = require('../config/conn');

const addRecipe = async (name, ingredients, preparation, userId) => 
  connect().then(async (db) => {
    const newRecipe = await db.collection('recipes').insertOne(
      { name, ingredients, preparation, userId },
    );
    return newRecipe.ops[0];
  });

const getAll = async () => connect().then((db) => db.collection('recipes').find({}).toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then(async (db) => {
    const recipe = await db.collection('recipes').findOne(ObjectId(id));
    return recipe;
  });
};

module.exports = {
  addRecipe,
  getAll,
  getById,
};
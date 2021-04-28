const { ObjectId } = require('mongodb');

const connect = require('../config/conn');

const addRecipe = async (name, ingredients, preparation, userId) => 
  connect().then(async (db) => {
    const newRecipe = await db.collection('recipes').insertOne(
      { name, ingredients, preparation, userId },
    );
    return newRecipe.ops[0];
  });

const getAllRecipe = async () => 
  connect().then((db) => db.collection('recipes').find({}).toArray());

const getByIdRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then(async (db) => {
    const recipe = await db.collection('recipes').findOne(ObjectId(id));
    return recipe;
  });
};

const updateRecipe = async (newRecipe) => 
  connect().then(async (db) => {
    const { id, name, ingredients, preparation, userId } = newRecipe;
    await db.collection('recipes').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
    );
    return { _id: id, name, ingredients, preparation, userId };
  });

  const deleteRecipe = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    connect().then(async (db) => {
      await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
    });
    return true;
  };

module.exports = {
  addRecipe,
  getAllRecipe,
  getByIdRecipe,
  updateRecipe,
  deleteRecipe,
};
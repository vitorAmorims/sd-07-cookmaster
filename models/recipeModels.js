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

const update = async (newRecipe) => 
  connect().then(async (db) => {
    const { id, name, ingredients, preparation, userId } = newRecipe;
    await db.collection('recipes').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
    );
    //  console.log(response);
    return { _id: id, name, ingredients, preparation, userId };
  });

module.exports = {
  addRecipe,
  getAll,
  getById,
  update,
};
const { ObjectID } = require('mongodb');
const connect = require('../config/conn');

const registerRecipe = async (name, ingredients, preparation, userId) => {
    const newRecipe = await connect().then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));
      return { _id: newRecipe.insertedId, name, ingredients, preparation, userId };
};
const findAll = async () => {
    const recipes = await connect().then((db) => db.collection('recipes')
    .find().toArray());
    return recipes;
  };
  const findById = async (id) => {
    const recipe = await connect().then((db) => db.collection('recipes')
    .findOne({ _id: ObjectID(id) }));

    return recipe;
  };

module.exports = {
    registerRecipe,
    findAll,
    findById,
};
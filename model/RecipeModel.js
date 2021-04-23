const { ObjectId } = require('mongodb');
const connect = require('../config/connect');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await connect().then((db) =>
       db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

  return { name, ingredients, preparation, _id: recipe.insertedId, userId };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
};

const findAll = async () => 
  connect().then((db) => db.collection('recipes').find().toArray());

module.exports = {
    createRecipe,
    findById,
    findAll,
};

const { ObjectId } = require('mongodb');
const connection = require('./connection');

const register = async (recipe) => {
  let response = null;
  await connection()
    .then((db) => db.collection('recipes').insertOne(recipe))
    .then((result) => {
      const [ops] = result.ops;
      response = ops;
    });
    return response;
};

const getAll = async () => {
  let response = null;
  await connection()
    .then((db) => db.collection('recipes').find().toArray())
    .then((result) => {
      response = result;
    });
    return response;
};

const getRecipe = async (id) => {
  let response = null;
  if (!ObjectId.isValid(id)) {
    return response;
  }
  await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }))
    .then((result) => {
      console.log('rec1', result);
      response = result;
    });
    return response;
};
const updateRecipe = async (id, newName, newIngredients, newPreparation) => {
  let response = null;
  await connection()
    .then((db) => db.collection('recipes').aggregate([
      { $match: {
        _id: ObjectId(id),
      } },
      { $set: {
        name: newName,
        ingredients: newIngredients,
        preparation: newPreparation,
      },
    }]))
    .then((result) => {
      response = result;
    });
    return response;
};
const deleteRecipe = async (id) => {
  let response = null;
  if (!ObjectId.isValid(id)) {
    return response;
  }
  await connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }))
    .then((result) => {
      response = result;
    });
    return response;
};

module.exports = {
  register,
  getAll,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};
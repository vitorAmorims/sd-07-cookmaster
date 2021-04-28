const { ObjectId } = require('mongodb');
const connect = require('../../config/connection');
const { userToken } = require('../helpers/authentication');

const add = async (name, ingredients, preparation, userId) =>
  connect().then(async (db) => {
    const recipe = await db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId });

    return recipe.ops[0];
  });

const auth = async (email) => {
  const token = userToken(email);

  return token;
};

const getAll = async () =>
  connect().then(async (db) => {
    const recipes = await db
      .collection('recipes')
      .find().toArray();
    
    return recipes;
  });

const getByID = async (id) =>
connect().then(async (db) => {
  const recipe = await db
    .collection('recipes')
    .findOne(ObjectId(id));
  return recipe;
});

module.exports = {
  add,
  auth,
  getAll,
  getByID,
};

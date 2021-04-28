const { ObjectId } = require('mongodb');
const connect = require('../../config/connection');
const { userToken } = require('../helpers/authentication');

const add = async (name, ingredients, preparation, userId) =>
  connect().then(async (db) => {
    const recipe = await db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId });
    console.log('new recipe', recipe);
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
    console.log('recipes', recipes);
    return recipes;
  });

const getByID = async (id) =>
connect().then(async (db) => {
  const recipe = await db
    .collection('recipes')
    .findOne(ObjectId(id));
  return recipe;
});

const updateByID = async (id, body, userId) => {
  const { name, ingredients, preparation } = body;
  
  return connect().then(async (db) => {
    const recipe = await db
      .collection('recipes')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
      );
    console.log('recipe', recipe);
    return { _id: id, userId, name, ingredients, preparation };
});
};

const excludeByID = async (id) =>
  connect().then(async (db) => db
    .collection('recipes')
    .deleteOne({ _id: ObjectId(id) }));

module.exports = {
  add,
  auth,
  getAll,
  getByID,
  updateByID,
  excludeByID,
};

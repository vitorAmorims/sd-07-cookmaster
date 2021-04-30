const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const RECIPES = 'recipes';

const getAll = async () => connection().then((db) => db.collection(RECIPES).find({}).toArray());

const getById = async (id) => connection().then((db) =>
    db.collection(RECIPES).findOne(ObjectId(id)));

const create = async ({ userId, name, ingredients, preparation }) => {
  const recipe = await connection().then((db) =>
    db.collection(RECIPES).insertOne({ userId, name, ingredients, preparation }));
  return { recipe: { _id: recipe.insertedId, userId, name, ingredients, preparation } };
};

const update = async ({ id, userId, name, ingredients, preparation }) => {
  await connection().then((db) => db
    .collection(RECIPES)
    .updateOne({ _id: ObjectId(id) }, { $set: { userId, name, ingredients, preparation } }));
  return { id, userId, name, ingredients, preparation };
};

const exclude = async (id) => connection().then((db) => db
    .collection(RECIPES)
    .deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};

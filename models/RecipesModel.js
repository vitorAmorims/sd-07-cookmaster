const { ObjectId } = require('mongodb');
const connect = require('../config/conn');

const add = async (name, ingredients, preparation, id) => connect()
  .then(async (db) => {
    const recipe = await db.collection('recipes').insertOne({
      name, ingredients, preparation, userId: id,
    });
  return recipe.ops[0];
});

const getAll = async () => connect()
  .then((db) => db.collection('recipes').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('recipe not found');

  return connect().then((db) => db.collection('recipes').findOne(ObjectId(id)));
};

const update = async (id, name, ingredients, preparation) =>
  connect().then(async (db) => db.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
  ));

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connect().then(async (db) => db
    .collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  exclude,
};

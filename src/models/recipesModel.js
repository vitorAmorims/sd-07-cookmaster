const { ObjectId } = require('mongodb');

const connection = require('../../config/conn');

const create = async (name, ingredients, preparation) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));
  return recipe.ops[0];
};

const getAll = async () => 
  connection()
    .then((db) => db.collection('recipes').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => 
    db.collection('recipes').findOne(ObjectId(id)));
};

const update = async (id, name, ingredients, preparation) => {
  await connection().then((db) =>
    db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
  return { _id: id, name, ingredients, preparation };
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  await connection().then((db) => {
  db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
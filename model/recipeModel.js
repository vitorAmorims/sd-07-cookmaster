const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getAll = async () =>
connection()
      .then((db) => db.collection('recipes').find().toArray());

const create = async (id, name, preparation, ingredients) =>
        connection()
          .then((db) => db.collection('recipes').insertOne(
            { userId: ObjectID(id), name, preparation, ingredients },
            ))
          .then(((result) => (
            { _id: result.insertedId, userId: id, name, preparation, ingredients }
        )));

const getById = async (id) => {
  if (ObjectID.isValid(id)) {
    return connection().then((db) => db.collection('recipes').findOne(new ObjectID(id)));
  }
  return null;
};

const editById = async (id, name, preparation, ingredients) => {
  await connection().then((db) => db.collection('recipes').findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: { name, ingredients, preparation } },
    ));
    const recipe = await getById(ObjectID(id));
    return recipe;
};

module.exports = { create, getAll, getById, editById };
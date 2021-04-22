const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const create = async (name, ingredients, preparation, _id) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, _id }));
  return { recipe: { name, ingredients, preparation, userId: _id, _id: recipe.insertedId } };
};

const getAll = () => connection().then((db) => db.collection('recipes').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return recipe;
};

const update = async (params) => {
  const { id, name, ingredients, preparation, _id } = params;
  if (!ObjectId.isValid(id)) return null;
  await connection().then((db) => db.collection('recipes')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation, userId: _id } },
    ));

  return {
    _id: id,
    name,
    ingredients,
    preparation,
    userId: _id,
  };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};

const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const createRecipes = async (name, ingredients, preparation, _id) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes').insertOne({name, ingredients, preparation, userId: _id }));
  return recipe.ops[0];
};

const getAll = async () => {
  const recipes = await connection().then((db) =>
    db.collection('recipes').find().toArray());
  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const product = await connection().then((db) =>
  db.collection('recipes').findOne(ObjectId(id)));

  return product;
};

const update = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const product = await connection().then((db) =>
    db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } })
  );
  return {_id: id, name, ingredients, preparation};
};


module.exports = {
  createRecipes,
  getAll,
  getById,
};

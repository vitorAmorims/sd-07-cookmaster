const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const createRecipes = async (name, ingredients, preparation, _id) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId: _id }));
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
  const recipe = await connection().then((db) =>
    db.collection('recipes').findOne(ObjectId(id)));

  return recipe;
};

const update = async (recipe, _id) => {
  if (!ObjectId.isValid(recipe.id)) { return null; }
  await connection().then((db) =>
    db.collection('recipes').updateOne({ _id: ObjectId(recipe.id) },
        {
          $set: {
            name: recipe.name,
            ingredients: recipe.ingredients,
            preparation: recipe.preparation,
            userId: _id,
          },
        }));
  return {
    _id: recipe.id,
    name: recipe.name,
    ingredients: recipe.ingredients,
    preparation: recipe.preparation,
    userId: _id,
  };
};

const excludeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const recipe = await connection().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  return recipe;
};

module.exports = {
  createRecipes,
  getAll,
  getById,
  update,
  excludeById,
};

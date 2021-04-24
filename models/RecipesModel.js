const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const create = async (recipe) =>
  connection().then(async (db) => {
    const newRecipe = await db.collection('recipes')
      .insertOne(recipe);
    return { recipe: newRecipe.ops[0] };
  });
  
const getAll = async () =>
  connection().then(async (db) => {
    const recipes = await db.collection('recipes')
      .find().toArray();
    return recipes;
  });

const getById = async (id) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes')
      .findOne(ObjectId(id)));
      console.log(recipe);
  return recipe;
};

const update = async (id, name, ingredients, preparation) =>
  connection().then(async (db) => {
    await db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
    return { id, name, ingredients, preparation };
  });

const deleteRecipe = async (id) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes')
      .findOneAndDelete({ _id: ObjectId(id) }));
  return recipe.value;
};

  module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteRecipe,
};

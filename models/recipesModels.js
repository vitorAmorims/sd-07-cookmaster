const { ObjectId } = require('mongodb');
const connection = require('./conn');

const addRecipe = async (name, ingredients, preparation, id) => {
  const result = await connection()
    .then((db) => db
      .collection('recipes').insertOne({ name, ingredients, preparation, userId: id }));
  return result.ops[0];
};

const getAllRecipes = async () =>
  connection()
      .then((db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => {
  const result = await connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return result;
};

const updateRecipe = async (id, name, ingredients, preparation) => 
  connection().then(async (db) => db.collection('recipes').findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
        { returnOriginal: false },
      ));

const deleteRecipe = async (id) =>
  connection().then(async (db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

const insertImg = async (id, img) =>
  connection().then(async (db) => db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { img } },
    { returnOriginal: false },
  ));

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  insertImg,
};

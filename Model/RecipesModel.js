const { ObjectId } = require('mongodb');
const conn = require('../Config/Connect');

const getAllRecipes = async () => {
  const result = await conn().then((db) => db.collection('recipes').find().toArray());
  return result; 
};

const getRecipesById = async (id) => {
  const result = await conn().then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return result;
};

const getByName = async (string) => {
  const result = await conn().then((db) => db.collection('recipes').findOne({ name: string }));
  return result;
};

const createRecipe = async (id, name, ingredients, preparation) => {
  const recipe = await conn().then((db) =>
    db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId: id }));

  return { _id: recipe.insertedId, name, ingredients, preparation, userId: id };
};

const editdata = async (objParams) => {
  const { userId, id, name, ingredients, preparation } = objParams;
  const updatedRecipe = await conn().then((db) =>
    db
      .collection('recipes')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { userId, name, ingredients, preparation } },
      ));
  return updatedRecipe;
};

const deletedata = async (id) => {
  await conn().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

const editDataWithPatch = async (objParams) => {
  const update = objParams;
  const { _id } = objParams;
  await conn().then((db) =>
    db.collection('recipes').updateOne({ _id: ObjectId(_id) }, { $set: update }));
};

module.exports = {
  getAllRecipes,
  getRecipesById,
  getByName,
  createRecipe,
  editdata,
  deletedata,
  editDataWithPatch,
};
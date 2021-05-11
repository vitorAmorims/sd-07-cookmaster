const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const getAll = async () => getConnection('recipes').then((db) => db.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection('recipes');
  const recipe = await db.find(ObjectId(id)).toArray();

  return recipe[0];
};

const newRecipe = async ({ name, ingredients, preparation, userId }) => {
  const db = await getConnection('recipes');
  const recipe = await db.insertOne({ name, ingredients, preparation, userId });

  return recipe.ops[0];
};

const editRecipe = async ({ name, ingredients, preparation, id }) => {
  if (!ObjectId.isValid(id)) return null;
  const updatedRecipe = { name, ingredients, preparation };
  const db = await getConnection('recipes');
  await db.updateOne({ _id: ObjectId(id) }, { $set: updatedRecipe });

  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection('recipes');
  const recipe = await db.deleteOne({ _id: ObjectId(id) });

  return recipe.deletedCount;
};

const addImage = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const image = `localhost:3000/images/${id}.jpeg`;
  const db = await getConnection('recipes');
  await db.updateOne({ _id: ObjectId(id) }, { $set: { image } });

  const recipe = await db.find(ObjectId(id)).toArray();
  return { ...recipe[0], image };
};

module.exports = {
  getAll,
  getById,
  newRecipe,
  editRecipe,
  deleteRecipe,
  addImage,
};
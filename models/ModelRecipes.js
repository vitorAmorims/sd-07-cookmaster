const { ObjectId } = require('mongodb');
const connect = require('../config/conn');

const collectionInUse = 'recipes';

const createRecipe = async (data) => {
  const { name, ingredients, preparation, userId } = data;
  const db = await connect();
  const { ops } = await db.collection(collectionInUse)
    .insertOne({ name, ingredients, preparation, userId });
  return ops;
};

const findRecipes = async () => {
  const db = await connect();
  return db.collection(collectionInUse).find().toArray();
};

const findRecipesById = async (id) => {
  const db = await connect();
  return db.collection(collectionInUse).findOne(ObjectId(id));
};

const deleteById = async (id) => {
  const db = await connect();
  return db.collection(collectionInUse).deleteOne({ _id: ObjectId(id) });
};

const updateById = async (data) => {
  const { _id, userId, name, ingredients, preparation } = data;
  const db = await connect();
  const recipeOld = findRecipesById(_id);
  db.collection(collectionInUse).updateOne(
    { _id: ObjectId(_id), userId },
    { $set: { ...recipeOld, name, ingredients, preparation } },
  );
  const getRecipe = await findRecipesById(_id);
  return getRecipe;
};

const insertImageRecipe = async (data) => {
  const { id, imagePath } = data;

  const db = await connect();
  db
    .collection(collectionInUse)
    .updateOne({ _id: ObjectId(id) }, { $set: { image: imagePath } });
  
  const result = await findRecipesById(id);
  return result;
};

module.exports = {
  createRecipe,
  findRecipes,
  findRecipesById,
  updateById,
  deleteById,
  insertImageRecipe,
};

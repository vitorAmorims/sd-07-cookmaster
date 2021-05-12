const { ObjectId } = require('mongodb');
const connection = require('./connection');

const col = 'recipes';

const getAllRecipes = async () => connection()
  .then((db) => db.collection(col).find().toArray());

const getRecipeById = async (id) => connection()
  .then((db) => db.collection(col).findOne(ObjectId(id)));

const createRecipe = async (recipe) => connection()
  .then((db) => db.collection(col)
    .insertOne(
      {
        ...recipe,
      },
    ))
    .then((result) => ({ _id: result.insertedId, ...recipe }));

const updateRecipe = async (id, recipe) => {
  connection()
    .then((db) => db.collection(col)
      .updateOne(
        { _id: ObjectId(id) },
        { $set: recipe },
    ));

  const result = await getRecipeById(id);
  return result;
};

const addImage = async (id, fileName) => {
  connection()
    .then((db) => db.collection(col)
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { image: `localhost:3000/images/${fileName}` } },
    ));

  const result = await getRecipeById(id);
  return result;
};

const deleteRecipe = async (id) => {
  const result = await getRecipeById(id);
  connection()
    .then((db) => db.collection(col)
      .deleteOne({ _id: ObjectId(id) }));

  return result;
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  addImage,
  deleteRecipe,
};

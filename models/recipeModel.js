const { ObjectId } = require('mongodb');
const connection = require('../config/connection');

const getAllRecipesModel = async () => connection().then(
  (db) => db.collection('recipes').find().toArray(),
);

const getRecipeByIdModel = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then(
    (db) => db.collection('recipes').findOne({ _id: ObjectId(id) }),
  );
};

const getRecipesByUserId = async (userId) => connection().then(
  (db) => db.collection('recipes').find({ userId }).toArray(),
);

const createRecipeModel = async (name, ingredients, preparation, userId) => connection().then(
  (db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId })
    .then((result) => ({
      recipe: { _id: result.insertedId, name, ingredients, preparation, userId },
    })),
);

const updateRecipeByIdModel = async (id, data, userId) =>
  connection().then(
    (db) => db.collection('recipes').findOneAndUpdate({ _id: ObjectId(id) },
      {
        $set:
        {
          name: data.name,
          ingredients: data.ingredients,
          preparation: data.preparation,
          userId,
        },
      }),
  );

const deleteRecipeByIdModel = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then(
    (db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }),
  );
};

module.exports = {
  getAllRecipesModel,
  createRecipeModel,
  getRecipesByUserId,
  getRecipeByIdModel,
  updateRecipeByIdModel,
  deleteRecipeByIdModel,
};
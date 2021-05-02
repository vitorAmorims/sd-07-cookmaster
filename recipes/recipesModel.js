const { ObjectId } = require('mongodb');
const connect = require('../util/connection');

const regRecipeModel = async (newRecipe, userId) => (
  connect().then((db) => db.collection('recipes')
    .insertOne({ ...newRecipe, userId }))
    .then((result) => result.ops[0])
);

const queryRecipesModel = async () => (
  connect().then((db) => db.collection('recipes')
    .find().toArray())
);

const queryRecipeModel = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('recipes')
   .findOne(ObjectId(id)));
};

const updateRecipetModel = async (id, data) => (
  connect().then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { data } }))
      .then(() => (data))
);

const excludeModel = async (id) => (
  connect().then((db) => 
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }))
);

module.exports = {
  regRecipeModel,
  queryRecipesModel,
  queryRecipeModel,
  updateRecipetModel,
  excludeModel,
};
const { ObjectId } = require('mongodb');
const connect = require('../config/connect');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await connect().then((db) =>
       db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

  return { name, ingredients, preparation, _id: recipe.insertedId, userId };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
};

const findAll = async () => 
  connect().then((db) => db.collection('recipes').find().toArray());

  const updateRecipe = async (id, recipeUpdated) => {
    if (!ObjectId.isValid(id)) return null;
  
    await connect().then((db) =>
      db.collection('recipes').updateOne(
        { _id: ObjectId(id) }, { $set: { ...recipeUpdated } },
      ));
    return { _id: id, ...recipeUpdated };
  };

  const excludeRecipe = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    await connect().then((db) => 
      db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  };

  const getRecipeImage = (id) => {
    const imagePath = `${__dirname}/../uploads/${id}.jpeg`;
    return imagePath;
  };

module.exports = {
    createRecipe,
    findById,
    findAll,
    updateRecipe,
    excludeRecipe,
    getRecipeImage,
};

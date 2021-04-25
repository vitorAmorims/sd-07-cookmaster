const { ObjectId } = require('bson');
const connect = require('../configs/connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipeRes = await connect().then((db) => 
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return { recipe: recipeRes.ops[0] };
};

const getRecipes = async () => {
  const recipeRes = await connect().then((db) => 
    db.collection('recipes').find().toArray());
  console.log(recipeRes);
  return recipeRes;
};

const getRecipeById = async (id) => {
  const recipeRes = await connect().then((db) => 
    db.collection('recipes').findOne(ObjectId(id)));
  return recipeRes;
};

const updateRecipe = async (id, name, preparation, ingredients) => {
  await connect().then((db) => db
    .collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, preparation, ingredients } }));

    return {
      _id: id,
      name,
      ingredients,
      preparation,
    };
};

const deleteRecipe = async (id) => {
  const res = await connect().then((db) => db
    .collection('recipes')
    .deleteOne({ _id: ObjectId(id) }));

    return res;
};

const uploadPhoto = async (id) => {
  await connect().then((db) => db
    .collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { image: `localhost:3000/images/${id}.jpeg` } }));

    return {
      _id: id,
    };
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadPhoto,
};
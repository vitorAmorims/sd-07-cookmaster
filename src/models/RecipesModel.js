const { ObjectId } = require('mongodb');
const connect = require('../config/connection');

const create = async (name, ingredients, preparation, userId) => {
    const newRecipe = await connect()
      .then((db) => db.collection('recipes')
        .insertOne({ name, ingredients, preparation, userId }));  
    return { recipe: newRecipe.ops[0] };
  };

  const getAllRecipes = async () => {
    const recipes = await connect()
      .then((db) => db.collection('recipes')
        .find({}).toArray());  
    return recipes;
  };

  const getRecipeById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const recipe = await connect()
    .then((db) =>
      db.collection('recipes')
         .findOne(ObjectId(id)));
  return recipe;
  };

  const update = async (id, name, ingredients, preparation) => {
    if (!ObjectId.isValid(id)) return null;
    const recipe = await connect()
      .then((db) => db.collection('recipes')
        .findOneAndUpdate({ _id: ObjectId(id) },
          { $set: { name, ingredients, preparation } },
          { returnOriginal: false }));
    return recipe.value;
  };

  const exclude = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    await connect()
    .then((db) => db.collection('recipes')
      .deleteOne({ _id: ObjectId(id) }));
  };

  const uploadImage = async (id) => { 
    const recipe = await getRecipeById(id);
    const { name, ingredients, preparation } = recipe;
    const recipeUpload = await connect().then((db) => db.collection('recipes')
    .findOneAndUpdate({ _id: ObjectId(id) },
    { $set: { name, ingredients, preparation, image: `localhost:3000/images/${id}.jpeg` } },
    { returnOriginal: false }));
    console.log(recipe, 'model');
    console.log(recipeUpload, 'model uploaded');
    return recipeUpload.value;
  };

module.exports = { create, getAllRecipes, getRecipeById, update, exclude, uploadImage };
const { ObjectId } = require('bson');
const connection = require('./connection');

const recipes = 'recipes';

const createRecipe = async (recipe) => connection()
  .then((db) => db.collection(recipes)
    .insertOne(recipe));

const findRecipeByName = async (name) => connection()
.then((db) => db.collection(recipes)
  .findOne({ name }));

const findRecipeById = async (id) => connection()
.then((db) => db.collection(recipes)
  .findOne(ObjectId(id)));

const getAllRecipes = async () => connection()
.then((db) => db.collection(recipes)
  .find().toArray());

const updateRecipe = async (id, recipe) => {
  const { name, ingredients, preparation } = recipe;
  connection() 
  .then((db) => db.collection(recipes)
    .updateOne({ _id: ObjectId(id) }, { $set: { 
      'recipe.name': name, 
      'recipe.ingredients': ingredients,
      'recipe.preparation': preparation,
    } }));

    return {
      _id: id,
      name,
      ingredients,
      preparation,
    };
};

const deleteRecipe = async (id) => connection()
    .then((db) => db.collection(recipes)
      .deleteOne({ _id: ObjectId(id) }));

module.exports = {
  createRecipe,
  findRecipeByName,
  findRecipeById,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
};

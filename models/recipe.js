const { ObjectId } = require('bson');
const connection = require('./connection');

const addRecipe = async (name, ingredients, preparation, userId) => {
  try {
    const recipe = await connection().then((db) =>
      db
        .collection('recipes')
        .insertOne({ name, ingredients, preparation, userId }));
    return recipe.ops[0];
  } catch (err) {
    console.log(err);
  }
};

const getRecipes = async () => {
  try {
    const recipes = await connection().then((db) =>
      db.collection('recipes').find().toArray());
    return recipes;
  } catch (err) {
    console.log(err);
  }
};

const getRecipeById = async (id) => {
  try {
    if (id.length !== 24) return undefined;
    const recipes = await connection().then((db) =>
      db
        .collection('recipes')
        .find({ _id: ObjectId(id) })
        .toArray());
    return recipes[0];
  } catch (err) {
    console.log(err);
  }
};

const editRecipeById = async (recipeEdited, userId, role, id) => {
  try {
    const { name, ingredients, preparation } = recipeEdited;
    const recipe = await getRecipeById(id);
    const userIdRecipe = recipe.userId;
    if (userIdRecipe === userId || role === 'admin') {
      await connection().then((db) =>
        db
          .collection('recipes')
          .updateOne({ _id: ObjectId(id) }, { $set: recipeEdited }));
      return { _id: id, name, ingredients, preparation, userIdRecipe };
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteRecipeById = async (userId, role, id) => {
  try {
    const recipe = getRecipeById(id);
    const userIdRecipe = recipe.userId;
    if (userIdRecipe === userId || role === 'admin') {
      await connection().then((db) =>
        db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
    }
  } catch (err) {
    console.log(err);
  }
};

const uploadRecipeImage = async (userId, role, id, path) => {
  try {
    const pathName = `localhost:3000/${path}`;
    const recipe = await getRecipeById(id);
    const userIdRecipe = recipe.userId;
    if (userIdRecipe === userId || role === 'admin') {
      await connection().then((db) =>
        db
          .collection('recipes')
          .updateOne({ _id: ObjectId(id) }, { $set: { image: pathName } }));
      return { ...recipe, image: pathName };
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipeById,
  uploadRecipeImage,
};

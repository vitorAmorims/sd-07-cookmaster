const { ObjectId } = require('bson');
const connection = require('./connection');

const addRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await connection().then((db) =>
    db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));
  return recipe.ops[0];
};

const getRecipes = async () => {
  const recipes = await connection().then((db) =>
    db.collection('recipes').find().toArray());
  return recipes;
};

const getRecipeById = async (id) => {
  if (id.length !== 24) return undefined;
  const recipes = await connection().then((db) =>
    db
      .collection('recipes')
      .find({ _id: ObjectId(id) })
      .toArray());
  return recipes[0];
};

const editRecipeById = async (
  name, ingredients, preparation, userId, role, id,
) => {
 const recipe = await connection().then((db) => db.collection('recipes')
 .find({ _id: ObjectId(id) }).toArray());
  const userIdRecipe = recipe[0].userId;
  if (userIdRecipe === userId || role === 'admin') {
    await connection().then((db) =>
      db.collection('recipes').updateOne(
          { _id: ObjectId(id) },
          { $set: { name, ingredients, preparation } },
));
    return { _id: id, name, ingredients, preparation, userIdRecipe };
  }
};

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
  editRecipeById,
};

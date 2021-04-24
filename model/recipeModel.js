const conn = require('./connection');

const insertNewRecipe = async (recipe) => {
  const { insertedId } = await conn().then((db) =>
    db.collection('recipes').insertOne({ ...recipe }));
  return { recipe: { ...recipe, _id: insertedId } };
};

const findAllRecipes = async () => {
  const result = await conn().then((db) =>
    db.collection('recipes').find({}).toArray());
  return result;
};

const findRecipeById = async (id) => {
  const result = await conn().then((db) =>
    db.collection('recipes').findOne({ _id: id }));
  return result;
};
const updateRecipeById = async (id, recipe, authorId) => {
  const { name, ingredients, preparation } = recipe;
  await conn().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: id }, { $set: { name, ingredients, preparation } }));
  return {
    _id: id,
    name,
    ingredients,
    preparation,
    userId: authorId,
  };
};
module.exports = {
  insertNewRecipe,
  findAllRecipes,
  findRecipeById,
  updateRecipeById,
};

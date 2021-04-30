const connect = require('./connection');

const createRecipe = async (recipe) => {
  const { insertedId } = await connect()
    .then((db) => db.collection('recipes').insertOne({ ...recipe }));
  return { recipe: { ...recipe, _id: insertedId } };
};

const searchAllRecipes = async () => {
  const recipes = await connect()
    .then((db) => db.collection('recipes').find({}).toArray());
  console.log({ recipes });
  return recipes;
};

const searchById = async (id) => {
  const search = await connect()
    .then((db) => db.collection('recipes').findOne({ _id: id }));
  return search;
};

module.exports = {
  createRecipe,
  searchAllRecipes,
  searchById,
};

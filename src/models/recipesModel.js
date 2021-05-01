const connect = require('./connection');

const colName = 'recipes';

const createRecipe = async (recipe) => {
  const { insertedId } = await connect()
    .then((db) => db.collection(colName).insertOne({ ...recipe }));
  return { recipe: { ...recipe, _id: insertedId } };
};

const searchAllRecipes = async () => {
  const recipes = await connect()
    .then((db) => db.collection(colName).find({}).toArray());
  return recipes;
};

const searchById = async (id) => {
  const search = await connect()
    .then((db) => db.collection(colName).findOne({ _id: id }));
  return search;
};

module.exports = {
  createRecipe,
  searchAllRecipes,
  searchById,
};

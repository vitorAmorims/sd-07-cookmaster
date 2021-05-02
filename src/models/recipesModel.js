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

const editRecipe = async (id, newRecipe, userId) => {
  const { name, preparation, ingredients } = newRecipe;
  const { insertedId } = await connect()
    .then((db) => db.collection(colName)
      .updateOne({ _id: id }, { $set: { name, preparation, ingredients } }));
  return {
    id: insertedId,
    name,
    preparation,
    ingredients,
    userId,
  };
};

const deleteRecipe = async (id) => {
  await connect()
    .then((db) => db.collection(colName).deleteOne({ _id: id }));
};

const uploadRecipeImage = async (id, url) => {
  await connect()
    .then((db) => db.collection(colName).updateOne({ _id: id }, { $set: { image: url } }));
  const recipe = await searchById(id);
  return {
    ...recipe,
    image: url,
  };
};

module.exports = {
  createRecipe,
  searchAllRecipes,
  searchById,
  editRecipe,
  deleteRecipe,
  uploadRecipeImage,
};

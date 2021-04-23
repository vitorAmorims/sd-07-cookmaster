const { ObjectId } = require('mongodb');
const connect = require('./connection');

const addNewRecipe = async (name, ingredients, preparation, userId) =>
  connect().then(async (db) => {
    const product = await db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId });
    return product.ops[0];
  });

function getAllRecipes() {
  return connect().then((db) => db.collection('recipes').find().toArray());
}

async function getById(id) {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('recipes').findOne(ObjectId(id)));
}

module.exports = {
  addNewRecipe,
  getAllRecipes,
  getById,
};

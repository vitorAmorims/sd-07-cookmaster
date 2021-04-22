const { ObjectId } = require('mongodb');
const connect = require('./connection');

const registerRecipes = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connect().then((db) =>
    db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: insertedId,
    },
  };
};

const findByIdRecipes = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const idSales = await connect().then((db) =>
    db.collection('recipes').findOne(new ObjectId(id)));

  return idSales;
};

const getAllRecipes = async () =>
  connect().then((db) => db.collection('recipes').find({}).toArray());

module.exports = {
  registerRecipes,
  getAllRecipes,
  findByIdRecipes,
};

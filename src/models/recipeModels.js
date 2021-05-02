const { ObjectID } = require('mongodb');
const connect = require('../config/connection');

const nonDb = 'Sem conexão com o banco';

const createRecipe = async (name, ingredients, preparation, id) => {
  try {
    // console.log(name);
    return await connect()
      .then((db) => db.collection('recipes')
        .insertOne({ name, ingredients, preparation, userId: ObjectID(id) }));
  } catch (error) {
    console.error({ message: nonDb });
  }
};

const getRecipes = async () => {
  try {
    return await connect().then((db) => db.collection('recipes').find().toArray());
  } catch (error) {
    console.error({ message: nonDb });
  }
};

const getRecipesById = async (id) => {
  try {
    return await connect().then((db) => db.collection('recipes').findOne(ObjectID(id)));
  } catch (error) {
    console.error({ message: nonDb });
  }
};

module.exports = { createRecipe, getRecipes, getRecipesById };

const { ObjectID } = require('mongodb');
const connection = require('../config/connection');

const createRecipes = async (name, ingredients, preparation, id) => {
  try {
    const db = await connection();
    const recipes = await db.collection('recipes').insertOne({
      name,
      ingredients,
      preparation,
      userId: ObjectID(id),
    });
    return recipes;
  } catch (error) {
    console.error({ message: 'Sem conexão com o banco' });
  }
};

const getAllRecipes = async () => {
  try {
    const db = await connection();
    const allRecipes = await db.collection('recipes').find().toArray();
    return allRecipes;
  } catch (error) {
    console.error({
      message: 'Não tem produto com esse nome no banco!',
    });
  }
};

const getRecipe = async (id) => {
  try {
    const db = await connection();
    const recipes = await db
      .collection('recipes')
      .findOne({ _id: ObjectID(id) });
    return recipes;
  } catch (error) {
    console.error({
      message: 'Não tem produto com esse nome no banco',
    });
  }
};

const updateRecipe = async (id, body) => {
  try {
    const { name, ingredients, preparation } = body;
    const query = { _id: ObjectID(id) };
    const update = { $set: { name, ingredients, preparation } };
    const option = { returnOriginal: false };
    const db = await connection();
    const recipes = await db
      .collection('recipes')
      .findOneAndUpdate(query, update, option);
    return recipes;
  } catch (error) {
    console.error({
      message: 'Não tem produto com esse nome no banco',
    });
  }
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipe,
  updateRecipe,
};

const { ObjectID } = require('mongodb');
const connection = require('../config/connection');

const ERRO = 'Sem conexão com o banco';

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
    console.error({ message: ERRO });
  }
};

const getAllRecipes = async () => {
  try {
    const db = await connection();
    const allRecipes = await db.collection('recipes').find().toArray();
    return allRecipes;
  } catch (error) {
    console.error({
      message: ERRO,
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
      message: ERRO,
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
      message: ERRO,
    });
  }
};

const deleteRecipe = async (id) => {
  try {
    const db = await connection();
    const recipes = await db
      .collection('recipes')
      .findOneAndDelete({ _id: ObjectID(id) });
    return recipes;
  } catch (error) {
    console.error({
      message: ERRO,
    });
  }
};

const insertImageRecipe = async (id, image) => {
  try {
    const query = { _id: ObjectID(id) };
    const update = { $set: { image } };
    const option = { returnOriginal: false };
    const db = await connection();
    const recipes = await db
      .collection('recipes')
      .findOneAndUpdate(query, update, option);
    return recipes;
  } catch (error) {
    console.error({
      message: ERRO,
    });
  }
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  insertImageRecipe,
};

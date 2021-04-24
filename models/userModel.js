const { ObjectId } = require('mongodb');
const connection = require('./connection');

// consertar o "magic number user nessa função"
const addUserDB = async (name, email, password) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }));
  const data = {
    user: {
      name,
      email,
      role: 'user',
      _id: insertedId,
    },
  };
  // console.log(`addUserDB no model valor : ${data}`);
  return data;
};

// { "name" : "Receita do Jacquin", "ingredients" : "Frango", "preparation" : "10 minutos no forno" }

const findEmail = async (email) => {
  const findedEmail = await connection().then((db) =>
    db.collection('users').findOne({ email }));
  return findedEmail;
};

const findPassword = async (password) => {
  const findedPassword = await connection().then((db) =>
    db.collection('users').findOne({ password }));
  return findedPassword;
};

const addRecipeDB = async (name, ingredients, preparation) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('recipes').insertOne({
      name,
      ingredients,
      preparation,
    }));
  const data = {
    recipe: {
      name,
      ingredients,
      preparation,
      userid: 'userid', // consertar
      _id: insertedId,
    },
  };
  // console.log(`addUserDB no model valor : ${data}`);
  return data;
};

const getAllRecipesDB = async () => {
  const allRecipes = await connection().then((db) =>
    db.collection('recipes').find().toArray());
  // console.log(`allRecipes em getAllRecipes: ${AllProducts}`);
  return allRecipes;
};

const getRecipeDB = async (id) => {
  const recipeById = await connection().then((db) =>
    db.collection('recipes').findOne(ObjectId(id)));
  // console.log(`getRecipeDB, recipeById: ${recipeById}`);
  return recipeById;
};

module.exports = {
  addUserDB,
  findEmail,
  findPassword,
  addRecipeDB,
  getAllRecipesDB,
  getRecipeDB,
};

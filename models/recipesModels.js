// const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const addRecipe = async (id, name, ingredients, preparation) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({ id, name, ingredients, preparation }));

const getRecipes = async () => connection().then((db) => db.collection('recipes').find().toArray());

module.exports = {
  addRecipe,
  getRecipes,
};

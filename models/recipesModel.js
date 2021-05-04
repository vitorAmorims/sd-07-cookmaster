const connection = require('../config/conn');
// const { ObjectId } = require('mongodb');

const createRecipes = async (name, ingredients, preparation) =>
  connection().then((db) =>
    db.collection('users').insertOne({ name, ingredients, preparation }))
    .then((result) => result.ops[0]);

module.exports = {
  createRecipes,
};

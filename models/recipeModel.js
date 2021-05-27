const connect = require('./connection');

const createRecipe = async (name, ingredients, preparation, id) => 
  connect().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId: id }))
    .then((result) => result.ops[0]);

module.exports = {
  createRecipe,
};

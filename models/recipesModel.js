const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const registerRecipe = async (userId, name, ingredients, preparation) => {
  const result = await connection().then((db) => 
    db.collection('users').insertOne({ userId, name, ingredients, preparation }));
  return result.ops[0];
};

module.exports = {
  registerRecipe,
};
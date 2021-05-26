const connection = require('./connection');

let response = null;

const register = async (recipe) => {
  await connection()
    .then((db) => db.collection('recipes').insertOne(recipe))
    .then((result) => {
      const [ops] = result.ops;
      response = ops;
    });
    return response;
};

module.exports = {
  register,
};
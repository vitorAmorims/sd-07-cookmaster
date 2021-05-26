const connection = require('./connection');

let response = null;

const register = async (recipe) => {
  await connection()
    .then((db) => db.collection('recipes').insertOne(recipe))
    .then((result) => {
      // eslint-disable-next-line prefer-destructuring
      response = result.ops[0];
    });
    return response;
};

module.exports = {
  register,
};
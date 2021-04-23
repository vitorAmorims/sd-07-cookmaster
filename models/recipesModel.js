const connect = require('./conn');

const createRecipe = async (name, ingredients, preparation) => 
  connect().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation }))
    .then((result) => result.ops[0]);

module.exports = {
  createRecipe,

};

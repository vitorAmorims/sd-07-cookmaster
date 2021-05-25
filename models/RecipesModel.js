const connection = require('./connection');

const create = (userId, name, ingredients, preparation) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({
      userId,
      name,
      ingredients,
      preparation,
    }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      ingredients,
      preparation,
      userId,
    }));

const getAll = () => 
    connection()
      .then((db) => db.collection('recipes').find().toArray())
      .then((recipe) => recipe);

module.exports = {
  create,
  getAll,
};
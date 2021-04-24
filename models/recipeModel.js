const connection = require('../config/conn');

const create = async (name, ingredients, preparation, userId) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return { recipe: { name, ingredients, preparation, userId, _id: recipe.insertedId } };
};

const getAll = async () => 
  connection().then((db) => 
  db.collection('recipes').find().toArray());
  
module.exports = {
  create,
  getAll,
};
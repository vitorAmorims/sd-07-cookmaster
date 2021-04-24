const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const create = async (name, ingredients, preparation, userId) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return { recipe: { name, ingredients, preparation, userId, _id: recipe.insertedId } };
};

const getAll = async () => 
  connection().then((db) => 
  db.collection('recipes').find().toArray());

const getById = async (id) => 
   connection().then((db) => 
   db.collection('recipes').findOne({ _id: ObjectId(id) }));
   
module.exports = {
  create,
  getAll,
  getById,
};
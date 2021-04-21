const { ObjectId } = require('mongodb');
const connect = require('../config/conn');

const collection = 'recipes';

const add = async (name, ingredients, preparation) =>
  connect().then(async (db) => {
    const recipe = await db.collection(collection).insertOne({ name, ingredients, preparation });
    
    return recipe.ops[0];
  });

  const getById = async (id) => {  
    if (!ObjectId.isValid(id)) return null;
  
    return connect().then((db) => db.collection('recipes').findOne(ObjectId(id)));  
  };

  const getAll = async () => 
    connect().then((db) => db.collection(collection).find().toArray());

  module.exports = {
    getAll,
    add,
    getById,
  };
